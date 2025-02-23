import { OrderResponse } from "./orderListType";

/**
 * 사용자 주문 목록 조회
 * @param page
 * @param limit
 * @returns
 */
export const fetchOrders = async (
    page = 1,
    limit = 10
): Promise<OrderResponse> => {
    const token = localStorage.getItem("token");
    const skip = (page - 1) * limit;

    const response = await fetch(
        `http://localhost:3001/api/v1/users/orders?skip=${skip}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.code === "E009") {
            throw new Error("사용자 인증에 실패했습니다..");
        }
    }

    if (!response.ok) {
        throw new Error("주문 목록을 가져오는데 실패했습니다.");
    }

    const data = await response.json();
    return data;
};
