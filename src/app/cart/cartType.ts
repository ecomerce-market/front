// 장바구니 상품 정보 타입
export interface CartItem {
    id: string;
    title: string;
    price: number;
    finalPrice: number;
    quantity: number;
    discount: number;
    img: string;
    isSelected: boolean;
    optionName: string | null;
}

// 장바구니 응답 타입
export interface CartApiResponse {
    message: string;
    carts: {
        productId: string;
        amount: number;
        createAt: string;
        optionName: string | null;
        productName: string;
        orgPrice: number;
        finalPrice: number;
        mainImgUrl: string;
        optOrgPrice: number;
        additionalPrice: number;
        deliveryInfo: string;
        deliveryFee: number;
    }[];
    totalPrice: number;
    totalDeliveryFee: number;
    totalDiscountPrice: number;
    finalPrice: number;
}

// 배송지 정보 타입
export interface Address {
    addressId: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

// 배송지 정보 응답 타입
export interface AddressApiResponse {
    message: string;
    addresses: Address[];
}

// 주문 요청 타입
export interface OrderRequestProduct {
    productId: string;
    amount: number;
    optionName: string | null;
}

// 주문 응답 타입
export interface OrderApiResponse {
    message: string;
    order: {
        orderId: string;
        products: {
            productId: string;
            amount: number;
            optionName: string | null;
            _id: string;
        }[];
        totalPrice: number;
        addressInfo: {
            userAddress: {
                address: string;
                extraAddress: string;
                defaultAddr: boolean;
            };
        };
        userInfo: {
            user: {
                _id: string;
                name: string;
                phone: string;
                email: string;
            };
        };
    };
}
