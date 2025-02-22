// 주문 목록 타입
export interface Order {
    orderId: string;
    orderDate: string;
    firstProductName: string;
    firstProductMainImgUrl: string;
    totalProductCnt: number;
    paymentMethod: string;
    totalPrice: number;
    totalDeliveryStatus: "ready" | "shipping" | "completed";
}

// 페이지네이션 타입
export interface OrderResponse {
    message: string;
    orders: Order[];
    totalItems: number;
    totalPages: number;
    currPage: number;
    currItem: number;
}
