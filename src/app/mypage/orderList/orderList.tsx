"use client";

import React, { useEffect, useState } from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OrderProductCard from "@/components/productCard/order/order";

const cx = cn.bind(styles);
interface Order {
    orderId: string;
    orderDate: string;
    firstProductName: string;
    firstProductMainImgUrl: string;
    totalProductCnt: number;
    paymentMethod: string;
    totalPrice: number;
    totalDeliveryStatus: "ready" | "shipping" | "completed";
}

interface OrderResponse {
    message: string;
    orders: Order[];
    totalItems: number;
    totalPages: number;
    currPage: number;
    currItem: number;
}
const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `http://localhost:3001/api/v1/users/orders?page=${page}&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data: OrderResponse = await response.json();
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    console.log("Current orders:", orders);
    const handlePageChange = (newPage: number) => {
        fetchOrders(newPage);
    };

    return (
        <div className={cx("orderListWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu title={"마이컬리"} />
                </div>
                <div className={cx("orderListSection")}>
                    <div className={cx("orderListTitle")}>
                        <h1 className={cx("mainTitle")}>주문내역</h1>
                        <p className={cx("subTitle")}>
                            최대 3년간의 주문 내역까지 확인할 수 있어요.
                        </p>
                    </div>
                    <div className={cx("orderListCard")}>
                        {orders.map((order) => {
                            return (
                                <OrderProductCard
                                    key={order.orderId}
                                    date={new Date(
                                        order.orderDate
                                    ).toLocaleDateString()}
                                    title={order.firstProductName}
                                    orderNumber={order.orderId}
                                    payMethod={order.paymentMethod}
                                    price={order.totalPrice}
                                    complete={
                                        order.totalDeliveryStatus ===
                                        "completed"
                                    }
                                    totalProductCnt={order.totalProductCnt}
                                    imageUrl={order.firstProductMainImgUrl}
                                />
                            );
                        })}
                    </div>
                    {totalPages > 1 && (
                        <div className={cx("pagination")}>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={cx("pageButton", {
                                        active: currentPage === index + 1,
                                    })}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
