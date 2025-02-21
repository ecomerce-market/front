import cn from "classnames/bind";
import styles from "./order.module.scss";
import React from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

const cx = cn.bind(styles);

// 배송 상태 타입 정의
type DeliveryStatusType = "배송준비중" | "배송중" | "배송완료";

// API 배송 상태 타입 정의
type ApiDeliveryStatusType = "ready" | "shipping" | "delivered";

interface OrderProductCardProps {
    date: string;
    title: string;
    orderNumber: string;
    payMethod: string;
    price: number;
    apiDeliveryStatus?: ApiDeliveryStatusType;
    deliveryStatus?: DeliveryStatusType;
    imageUrl?: string;
    totalProductCnt: number;
    onClick?: () => void;
}

// 결제 방식을 영어에서 한글로 변환하는 함수
const getKoreanPayMethod = (englishPayMethod: string): string => {
    const payMethodMap: { [key: string]: string } = {
        card: "신용카드",
    };

    return payMethodMap[englishPayMethod.toLowerCase()] || englishPayMethod;
};

const OrderProductCard: React.FC<OrderProductCardProps> = ({
    date,
    title,
    orderNumber,
    payMethod,
    price,
    apiDeliveryStatus,
    deliveryStatus,
    totalProductCnt,
    onClick,
}) => {
    const displayTitle =
        totalProductCnt > 1 ? `${title} 외 ${totalProductCnt - 1}개` : title;

    // 배송상태 한글 변환
    const getKoreanDeliveryStatus = (
        apiStatus?: ApiDeliveryStatusType
    ): DeliveryStatusType => {
        if (!apiStatus) return "배송준비중";

        const statusMap: Record<ApiDeliveryStatusType, DeliveryStatusType> = {
            ready: "배송준비중",
            shipping: "배송중",
            delivered: "배송완료",
        };

        return statusMap[apiStatus];
    };

    // 결제방식 한글 변환
    const koreanPayMethod = getKoreanPayMethod(payMethod);

    // 배송 상태
    const showDeliveryStatus =
        deliveryStatus || getKoreanDeliveryStatus(apiDeliveryStatus);

    return (
        <div className={cx("orderWrapper")}>
            <div className={cx("showMore")}>
                <p>{date}</p>
                <Link href={`/mypage/orderList/orderDetail/${orderNumber}`}>
                    <p>
                        주문내역 상세보기
                        <FaAngleRight />
                    </p>
                </Link>
            </div>
            <div className={cx("orderMain")}>
                <div className={cx("productDetail")}>
                    <Image
                        width={70}
                        height={86}
                        src={"/images/example.png"}
                        //  src={imageUrl}
                        alt={title}
                    />
                    <div className={cx("infoDetail")}>
                        <div>
                            <p>상품명</p>
                            <p>{displayTitle}</p>
                        </div>
                        <div>
                            <p>주문번호</p>
                            <p>{orderNumber}</p>
                        </div>
                        <div>
                            <p>결제방법</p>
                            <p>{koreanPayMethod}</p>
                        </div>
                        <div>
                            <p>결제금액</p>
                            <p>{price.toLocaleString()}원</p>
                        </div>
                    </div>
                </div>
                <div className={cx("productDetail")}>
                    <p>{showDeliveryStatus}</p>
                    <Link href={`/inquiry/inquiryDetail/${orderNumber}`}>
                        <OneBtn
                            onClick={onClick}
                            title={"1:1 문의"}
                            width={"100"}
                            height={"28"}
                            fontSize={"13"}
                            padding="12px 15px"
                            color="--main-color"
                            border="--main-color"
                            borderSize="2"
                            bgcolor="--white"
                            fontWeight="600"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderProductCard;
