"use client";
import React from "react";
import Payment from "./payment";
import axios from "axios";

const PaymentPage = () => {
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다");
        }

        const response = await axios.get(
            "http://localhost:3001/api/v1/users/profiles",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.data || response.data;
    };

    const fetchAddresses = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("인증 토큰이 없습니다.");
        }

        const response = await axios.get(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
            }/api/v1/users/addresses`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (
            response.data.message === "success" &&
            Array.isArray(response.data.addresses)
        ) {
            return response.data.addresses;
        }
        throw new Error("주소 데이터를 불러오는데 실패했습니다.");
    };

    return (
        <div>
            <Payment
                onFetchUserData={fetchUserData}
                onFetchAddresses={fetchAddresses}
            />
        </div>
    );
};

export default PaymentPage;
