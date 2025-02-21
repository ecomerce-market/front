"use client";

import React, { useEffect, useState } from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OrderProductCard from "@/components/productCard/order/order";
import { fetchOrders } from "./orderService";
import { Order } from "./orderListType";

const cx = cn.bind(styles);

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 주문 데이터 불러오기
    const loadOrders = async (page = 1) => {
        try {
            setIsLoading(true);
            const data = await fetchOrders(page);
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        loadOrders();
    }, []);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        loadOrders(newPage);
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
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <OrderProductCard
                                    key={order.orderId}
                                    date={new Date(
                                        order.orderDate
                                    ).toLocaleDateString()}
                                    title={order.firstProductName}
                                    orderNumber={order.orderId}
                                    payMethod={order.paymentMethod}
                                    price={order.totalPrice}
                                    totalProductCnt={order.totalProductCnt}
                                    imageUrl={order.firstProductMainImgUrl}
                                />
                            ))
                        ) : (
                            <div className={cx("noOrders")}>
                                주문 내역이 없습니다.
                            </div>
                        )}
                    </div>
                    {/* 페이지네이션 */}
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
