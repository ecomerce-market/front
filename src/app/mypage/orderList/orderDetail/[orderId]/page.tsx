import React from "react";
import OrderDetail from "./orderDetail";

const Page = ({ params }: { params: { orderId: string } }) => {
    return <OrderDetail orderId={params.orderId} />;
};

export default Page;
