"use client";

import Payment from "./payment";
import axios from "axios";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface OrderUpdateData {
    usePoint?: number;
    userAddressId?: string;
    paymentMethod?: "card";
    couponId?: string;
}

interface ApproveResponse {
    message: string;
    totalPaidPrice: number;
    addedPoints: number;
    orderId: string;
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
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("주문 업데이트 요청:", {
                orderId,
                updateData,
                응답: response.data,
            });

            if (response.data.message === "order update success") {
                return response.data.order;
            }

            throw new Error("주문서 수정에 실패했습니다.");
        } catch (error: any) {
            console.error(
                "주문 업데이트 중 오류:",
                error.response?.data || error
            );
            throw error;
        }
    };

    // 주문 승인
    const approveOrder = async (): Promise<ApproveResponse> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("인증 토큰이 없습니다.");
        }

        if (!orderId) {
            throw new Error("주문 ID가 없습니다.");
        }

        try {
            const response = await axios.post(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
                }/api/v1/orders/${orderId}/approve`,
                {
                    // 멱등성
                    uuid: uuidv4(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === "order approve success") {
                return response.data;
            }

            throw new Error("주문 승인에 실패했습니다.");
        } catch (error: any) {
            if (error.response?.status === 400) {
                throw new Error(error.response.data.message);
            } else if (error.response?.status === 404) {
                throw new Error("주문서가 존재하지 않습니다.");
            }
            console.error("Order approval error:", error);
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
                onApproveOrder={approveOrder}
            />
        </div>
    );
};

export default PaymentPage;
