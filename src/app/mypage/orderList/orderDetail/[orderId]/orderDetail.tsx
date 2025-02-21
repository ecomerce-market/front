"use client";
import React from "react";
import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import DetailProductCard, {
    DeliveryStatusType,
} from "@/components/productCard/detail/product";
import { useOrderDetail, getDeliveryStatus } from "./orderDetailService";

const cx = cn.bind(styles);

interface OrderDetailProps {
    orderId: string;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
    const { loading, error, orderData } = useOrderDetail(orderId);

    if (loading) {
        return <div className={cx("loading")}>로딩 중...</div>;
    }

    if (error) {
        return <div className={cx("error")}>{error.message}</div>;
    }

    if (!orderData) {
        return (
            <div className={cx("notFound")}>주문 정보를 찾을 수 없습니다.</div>
        );
    }

    const { order } = orderData;
    const deliveryStatus: DeliveryStatusType = getDeliveryStatus(
        order.deliveryStatus
    );

    const safeParse = (value: any): number => {
        if (value === null || value === undefined) return 0;

        if (typeof value === "number") return value;

        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const originalPrice = safeParse(order.totalOrgPrice);
    const discountAmount = safeParse(order.totalDiscountedPrice);
    const finalPrice = Math.max(0, originalPrice - discountAmount);

    return (
        <div className={cx("orderDetailWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu title={"마이컬리"} />
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
                                {order.products.map((product) => {
                                    return (
                                        <DetailProductCard
                                            key={product._id}
                                            title={product.optionName}
                                            orgPrice={`${originalPrice.toLocaleString()}원`}
                                            finalPrice={
                                                discountAmount > 0
                                                    ? `${finalPrice.toLocaleString()}원`
                                                    : undefined
                                            }
                                            count={`${product.amount}개`}
                                            deliveryStatus={deliveryStatus}
                                        />
                                    );
                                })}
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
                                    {finalPrice.toLocaleString()}원
                                </p>
                            </div>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품할인금액</p>
                                <p className={cx("infoValue")}>
                                    {discountAmount.toLocaleString()}원
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
