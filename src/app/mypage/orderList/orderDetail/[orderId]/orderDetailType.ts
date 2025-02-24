// 상품 타입
export interface Product {
    productId: string;
    amount: number;
    _id: string;
    productName: string;
    optionName?: string;
    orgPrice: number;
    finalPrice: number;
    deliveryInfo: {
        deliveryStatus: string;
    };
}
// 배송지 타입
export interface AddressInfo {
    userAddress: {
        _id: string;
        address: string;
        extraAddress: string;
        defaultAddr: boolean;
    };
}

// 유저 타입
export interface UserInfo {
    user: {
        _id: string;
        email: string;
        name: string;
    };
}

// 배송 타입
export interface DeliveryStatus {
    icedProdDelivStatus: "ready" | "shipping" | "delivered";
    nonIcedProdDelivStatus: "ready" | "shipping" | "delivered";
}

// 주문서 상세 타입
export interface OrderDetail {
    products: Product[];
    totalPrice: number;
    addressInfo: AddressInfo;
    userInfo: UserInfo;
    paymentMethod: string;
    paymentStatus: string;
    usedPoints: number;
    userCoupon: string;
    approveAt: string;
    deliveryStatus: DeliveryStatus;
    totalOrgPrice: string;
    totalDiscountedPrice: number;
}

// 주문서 상세 응답 타입
export interface OrderResponse {
    message: string;
    order: OrderDetail;
}

// 에러 응답 타입
export interface ErrorResponse {
    message: string;
    code?: string;
}
