// types.ts
export interface ProductType {
    productId: {
        productName: string;
        orgPrice: number;
        finalPrice: number;
        mainImgUrl: string;
    };
    optionName?: string;
    amount: number;
}

export interface AddressType {
    addressId: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

export interface UserDataType {
    _id: string;
    name: string;
    email: string;
}

export interface OrderType {
    products: ProductType[];
    totalPrice: number;
    totalOrgPrice: number;
    totalDiscountedPrice: number;
    addressInfo: {
        userAddress: {
            address: string;
            extraAddr: string;
            defaultAddr: boolean;
        };
    };
    userInfo: {
        user: UserDataType;
    };
    usedPoints: number;
    paymentMethod: string;
}

export interface ApproveResponse {
    message?: string;
    totalPaidPrice: number;
    addedPoints: number;
    orderId: string;
}

export interface OrderUpdateData {
    usePoint?: number;
    userAddressId?: string;
    paymentMethod?: string;
    couponId?: string;
}

export interface PaymentProps {
    onFetchUserData: () => Promise<UserDataType>;
    onFetchAddresses: () => Promise<AddressType[]>;
    onFetchOrderDetails: () => Promise<OrderType>;
    onUpdateOrder: (updateData: OrderUpdateData) => Promise<OrderType>;
    onApproveOrder: () => Promise<ApproveResponse>;
}

export interface Calculations {
    totalProductPrice: number;
    shippingFee: number;
    productDiscount: number;
    pointsUsed: number;
    finalAmount: number;
}
