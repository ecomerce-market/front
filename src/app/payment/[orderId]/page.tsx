"use client";

import Payment from "./payment";
import axios from "axios";
import { useParams } from "next/navigation";

interface OrderUpdateData {
    usePoint?: number;
    userAddressId?: string;
    paymentMethod?: "CARD";
    couponId?: string;
}

const PaymentPage = () => {
    const params = useParams();
    const orderId = params?.orderId as string;

    // 유저 정보 조회
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다");
        }

        try {
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
        } catch (error) {
            console.error("User data fetch error:", error);
            throw error;
        }
    };

    // 배송지 정보 조회
    const fetchAddresses = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("인증 토큰이 없습니다.");
        }

        try {
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
        } catch (error) {
            console.error("Addresses fetch error:", error);
            throw error;
        }
    };

    // 주문 조회
    const fetchOrderDetails = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("인증 토큰이 없습니다.");
        }

        if (!orderId) {
            throw new Error("주문 ID가 없습니다.");
        }

        try {
            const response = await axios.get(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
                }/api/v1/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === "success") {
                return response.data.order;
            }

            console.error("Unexpected response:", response.data);
            throw new Error("주문 정보를 불러오는데 실패했습니다.");
        } catch (error: any) {
            console.error("Detailed Error:", error);
            throw error;
        }
    };

    // 주문 수정
    const updateOrder = async (updateData: OrderUpdateData) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("인증 토큰이 없습니다.");
        }

        if (!orderId) {
            throw new Error("주문 ID가 없습니다.");
        }

        try {
            const response = await axios.patch(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
                }/api/v1/orders/${orderId}`,
                {
                    products: [updateData],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === "order update success") {
                return response.data.order;
            }

            throw new Error("주문서 수정에 실패했습니다.");
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            console.error("Order update error:", error);
            throw error;
        }
    };

    return (
        <div>
            <Payment
                onFetchUserData={fetchUserData}
                onFetchAddresses={fetchAddresses}
                onFetchOrderDetails={fetchOrderDetails}
                onUpdateOrder={updateOrder}
            />
        </div>
    );
};

export default PaymentPage;
