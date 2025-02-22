import { useState, useEffect } from "react";
import { OrderResponse, ErrorResponse } from "./orderDetailType";

export const useOrderDetail = (orderId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [orderData, setOrderData] = useState<OrderResponse | null>(null);

    // 주문서 조회
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                setError({ message: "로그인이 필요합니다.", code: "E401" });
                setLoading(false);
                return;
            }

            const response = await fetch(
                `http://localhost:3001/api/v1/orders/${orderId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).catch(() => {
                setError({
                    message: "서버 연결에 실패했습니다.",
                });
                setLoading(false);
                return null;
            });

            if (!response) return;

            if (response.status === 401) {
                const errorData = await response.json();
                setError({
                    message:
                        errorData.code === "E009"
                            ? "사용자 인증에 실패했습니다."
                            : "로그인이 필요합니다.",
                    code: "E009",
                });
                setLoading(false);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                setError({
                    message:
                        errorData.message || "주문 정보 조회에 실패했습니다.",
                });
                setLoading(false);
                return;
            }

            const data = await response.json();
            setOrderData(data);
            setError(null);
            setLoading(false);
        };

        fetchData();
    }, [orderId]);

    return { loading, error, orderData };
};

// 배송 상태
export const getDeliveryStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
        ready: "배송준비중",
        shipping: "배송중",
        delivered: "배송완료",
    };
    return statusMap[status] || "배송준비중";
};
