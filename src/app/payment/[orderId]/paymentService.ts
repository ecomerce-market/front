// api.ts
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
    UserDataType,
    AddressType,
    OrderType,
    OrderUpdateData,
    ApproveResponse,
} from "./paymentType";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const fetchUserData = async (): Promise<UserDataType> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/profiles`,
            {
                headers: getAuthHeader(),
            }
        );
        return response.data.data || response.data;
    } catch (error) {
        console.error("User data fetch error:", error);
        throw error;
    }
};

export const fetchAddresses = async (): Promise<AddressType[]> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/addresses`,
            {
                headers: getAuthHeader(),
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

export const fetchOrderDetails = async (
    orderId: string
): Promise<OrderType> => {
    if (!orderId) {
        throw new Error("주문 ID가 없습니다.");
    }

    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/orders/${orderId}`,
            {
                headers: getAuthHeader(),
            }
        );

        if (response.data.message === "success") {
            return response.data.order;
        }

        console.error("Unexpected response:", response.data);
        throw new Error("주문 정보를 불러오는데 실패했습니다.");
    } catch (error) {
        console.error("Detailed Error:", error);
        throw error;
    }
};

export const updateOrder = async (
    orderId: string,
    updateData: OrderUpdateData
): Promise<OrderType> => {
    if (!orderId) {
        throw new Error("주문 ID가 없습니다.");
    }

    try {
        const response = await axios.patch(
            `${API_BASE_URL}/api/v1/orders/${orderId}`,
            updateData,
            {
                headers: getAuthHeader(),
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
        console.error("주문 업데이트 중 오류:", error.response?.data || error);
        throw error;
    }
};

export const approveOrder = async (
    orderId: string
): Promise<ApproveResponse> => {
    if (!orderId) {
        throw new Error("주문 ID가 없습니다.");
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/orders/${orderId}/approve`,
            {
                // 멱등성
                uuid: uuidv4(),
            },
            {
                headers: getAuthHeader(),
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
