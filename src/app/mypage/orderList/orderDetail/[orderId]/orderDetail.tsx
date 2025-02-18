"use client";
import React, { useEffect, useState } from "react";
import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import DetailProductCard from "@/components/productCard/detail/product";
import Link from "next/link";

const cx = cn.bind(styles);

interface Product {
    productId: string;
    amount: number;
    _id: string;
    optionName: string;
}

interface AddressInfo {
    userAddress: {
        _id: string;
        address: string;
        extraAddress: string;
        defaultAddr: boolean;
    };
}

interface UserInfo {
    user: {
        _id: string;
        email: string;
        name: string;
    };
}

interface DeliveryStatus {
    icedProdDelivStatus: "ready" | "shipping" | "delivered";
    nonIcedProdDelivStatus: "ready" | "shipping" | "delivered";
}

interface OrderDetail {
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
    totalOrgPrice: number;
    totalDiscountedPrice: number;
}

interface OrderResponse {
    message: string;
    order: OrderDetail;
}

interface ErrorResponse {
    message: string;
    code: string;
}

const useOrderDetail = (orderId: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [orderData, setOrderData] = useState<OrderResponse | null>(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                // 클라이언트 사이드에서만 localStorage 접근!
                const token =
                    typeof window !== "undefined"
                        ? localStorage.getItem("token")
                        : null;
                console.log("Fetching order detail - token:", token);
                console.log("Fetching order detail - OrderId:", orderId);

                if (!token) {
                    throw new Error("로그인이 필요합니다.");
                }

                const response = await fetch(
                    `http://localhost:3001/api/v1/orders/${orderId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error response:", errorData);
                    throw new Error(
                        errorData.message ||
                            "주문 정보를 불러오는 데 실패했습니다."
                    );
                }

                const data: OrderResponse = await response.json();
                console.log("Fetched order data:", data);
                setOrderData(data);
                setError(null);
            } catch (err) {
                console.error("Complete fetch error:", err);
                setError({
                    message:
                        err instanceof Error
                            ? err.message
                            : "서버 연결에 실패했습니다.",
                    code: "E500",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    return { loading, error, orderData };
};

const getDeliveryStatus = (deliveryStatus: DeliveryStatus) => {
    const { icedProdDelivStatus, nonIcedProdDelivStatus } = deliveryStatus;

    if (
        icedProdDelivStatus === "shipping" ||
        nonIcedProdDelivStatus === "shipping"
    ) {
        return "배송중";
    }
    if (
        icedProdDelivStatus === "delivered" &&
        nonIcedProdDelivStatus === "delivered"
    ) {
        return "배송완료";
    }
    return "배송준비중";
};

interface OrderDetailProps {
    orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
    const { orderData } = useOrderDetail(orderId);

    if (!orderData) {
        return null;
    }

    const { order } = orderData;
    const deliveryStatus = getDeliveryStatus(order.deliveryStatus);

    return (
        <div className={cx("orderDetailWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/mypage/myInfo" },
                            { label: "주문내역", path: "/mypage/orderList" },
                            { label: "찜한상품", path: "/mypage/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/mypage/addressManagement",
                            },
                            { label: "상품 후기", path: "/mypage/review" },
                        ]}
                    />
                </div>
                <div className={cx("orderDetailSection")}>
                    <div className={cx("orderDetailTitle")}>
                        <h1 className={cx("mainTitle")}>주문 내역 상세</h1>
                    </div>
                    <div className={cx("orderDetailForm")}>
                        <div className={cx("productSection")}>
                            <div className={cx("productNum")}>
                                <h2>주문번호 {orderId}</h2>
                                <div>
                                    <p>배송 또는 상품에 문제가 있나요?</p>
                                    <Link href="/inquiry/inquiryDetail">
                                        <p className={cx("ask")}>
                                            1:1 문의하기
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx("productList")}>
                                {order.products.map((product) => (
                                    <DetailProductCard
                                        key={product._id}
                                        title={product.optionName}
                                        price={`${order.totalOrgPrice.toLocaleString()}원`}
                                        discountPrice={
                                            order.totalDiscountedPrice > 0
                                                ? `${order.totalDiscountedPrice.toLocaleString()}원`
                                                : undefined
                                        }
                                        count={`${product.amount}개`}
                                        complete={deliveryStatus === "배송완료"}
                                        deliveryStatus={deliveryStatus}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={cx("trackingSection")}>
                            <h2 className={cx("trackingTitle")}>배송조회</h2>
                            <div className={cx("trackingInfo")}>
                                <p className={cx("deliveryType")}>
                                    {order.products.length > 0
                                        ? "컬리배송"
                                        : ""}
                                </p>
                                <p className={cx("deliveryStatus")}>
                                    {deliveryStatus}
                                </p>
                            </div>
                        </div>
                        <div className={cx("paymentSection")}>
                            <h2 className={cx("paymentTitle")}>결제정보</h2>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품금액</p>
                                <p className={cx("infoValue")}>
                                    {order.totalPrice || order.totalOrgPrice
                                        ? `${(
                                              order.totalPrice ||
                                              order.totalOrgPrice
                                          ).toLocaleString()}원`
                                        : "0원"}
                                </p>
                            </div>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품할인금액</p>
                                <p className={cx("infoValue")}>
                                    {order.totalDiscountedPrice
                                        ? `${order.totalDiscountedPrice.toLocaleString()}원`
                                        : "0원"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
