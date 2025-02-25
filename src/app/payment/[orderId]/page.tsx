"use client";

import React from "react";
import { useParams } from "next/navigation";
import Payment from "./payment";
import { usePayment } from "./paymentHooks";

const PaymentPage = () => {
    const params = useParams();
    const orderId = params?.orderId as string;

    // usePayment 훅을 사용하여 필요한 데이터와 핸들러 함수들을 가져옵니다
    const {
        onFetchUserData,
        onFetchAddresses,
        onFetchOrderDetails,
        onUpdateOrder,
        onApproveOrder,
    } = usePayment(orderId);

    return (
        <Payment
            onFetchUserData={onFetchUserData}
            onFetchAddresses={onFetchAddresses}
            onFetchOrderDetails={onFetchOrderDetails}
            onUpdateOrder={onUpdateOrder}
            onApproveOrder={onApproveOrder}
        />
    );
};

export default PaymentPage;
