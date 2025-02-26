import {
    CartApiResponse,
    AddressApiResponse,
    OrderApiResponse,
    CartItem,
    OrderRequestProduct,
    Address,
} from "./cartType";

// 배송지 조회
export const fetchAddresses = async (): Promise<Address[]> => {
    const response = await fetch(
        "http://localhost:3001/api/v1/users/addresses",
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("배송지 정보를 불러오는데 실패했습니다.");
    }

    const data: AddressApiResponse = await response.json();
    return data.addresses;
};

// 장바구니 조회
export const fetchCartData = async (): Promise<CartItem[]> => {
    const response = await fetch("http://localhost:3001/api/v1/users/carts", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("장바구니 데이터를 불러오는데 실패했습니다.");
    }

    const data: CartApiResponse = await response.json();

    if (data.carts.length === 0) {
        return [];
    }

    const cartItems = data.carts.map((cartItem) => ({
        id: cartItem.productId,
        title: cartItem.productName,
        price: cartItem.orgPrice,
        finalPrice: cartItem.finalPrice,
        quantity: cartItem.amount,
        discount: cartItem.orgPrice - cartItem.finalPrice,
        img: "/images/example.png",
        isSelected: false,
        optionName: cartItem.optionName,
    }));

    return cartItems;
};

// 장바구니 삭제 / 전체 삭제
export const deleteCartItems = async (
    selectedItemIds: string[]
): Promise<void> => {
    if (selectedItemIds.length === 0) {
        const response = await fetch(
            "http://localhost:3001/api/v1/users/carts",
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("장바구니 전체 삭제에 실패했습니다.");
        }
    } else {
        await Promise.all(
            selectedItemIds.map(async (productId) => {
                const response = await fetch(
                    `http://localhost:3001/api/v1/users/carts/${productId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`상품 ${productId} 삭제에 실패했습니다.`);
                }
            })
        );
    }
};

// 주문서 생성
export const createOrder = async (
    orderProducts: OrderRequestProduct[]
): Promise<OrderApiResponse> => {
    const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            products: orderProducts,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "주문 생성에 실패했습니다.");
    }

    const orderData: OrderApiResponse = await response.json();
    return orderData;
};
