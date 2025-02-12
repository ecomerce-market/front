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
    return (
        <div>
            <Payment onFetchUserData={fetchUserData} />
        </div>
    );
};

export default PaymentPage;
