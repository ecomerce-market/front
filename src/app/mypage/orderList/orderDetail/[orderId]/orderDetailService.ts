import { useState, useEffect } from "react";
import { OrderResponse, ErrorResponse } from "./orderDetailType";
import {
    DeliveryStatusType,
    convertApiToDisplayStatus,
} from "@/components/productCard/detail/product";

export const useOrderDetail = (orderId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [orderData, setOrderData] = useState<OrderResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const token = localStorage.getItem("token");
            if (!token) {
                setError({ message: "로그인이 필요합니다.", code: "E401" });
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3001/api/v1/orders/${orderId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    const errorData = await response.json();
                    setError({
                        message:
                            errorData.code === "E009"
                                ? "사용자 인증에 실패했습니다."
                                : "로그인이 필요합니다.",
                        code: "E009",
                    });
                    return;
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    setError({
                        message:
                            errorData.message ||
                            "주문 정보 조회에 실패했습니다.",
                    });
                    return;
                }

                const data = await response.json();

                const transformedData = {
                    ...data,
                    order: {
                        ...data.order,
                        products: data.order.products.map((product: any) => ({
                            ...product,

                            productName: product.productId?.productName,
                        })),
                    },
                };

                setOrderData(transformedData);
                setError(null);
            } catch (err) {
                setError({
                    message: "서버 연결에 실패했습니다.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orderId]);

    return { loading, error, orderData };
};

export const getDeliveryStatus = (deliveryStatus: {
    icedProdDelivStatus: string;
    nonIcedProdDelivStatus: string;
}): DeliveryStatusType => {
    const getStatusPriority = (status: string): number => {
        switch (status) {
            case "ready":
                return 1;
            case "shipping":
                return 2;
            case "delivered":
                return 3;
            default:
                return 0;
        }
    };

    const icedStatus = getStatusPriority(deliveryStatus.icedProdDelivStatus);
    const nonIcedStatus = getStatusPriority(
        deliveryStatus.nonIcedProdDelivStatus
    );

    const finalStatus =
        icedStatus >= nonIcedStatus
            ? deliveryStatus.icedProdDelivStatus
            : deliveryStatus.nonIcedProdDelivStatus;

    return convertApiToDisplayStatus(finalStatus as ApiDeliveryStatusType);
};
