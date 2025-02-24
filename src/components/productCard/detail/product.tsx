import cn from "classnames/bind";
import styles from "./product.module.scss";
import React from "react";
import Image from "next/image";

const cx = cn.bind(styles);

// 배송 상태 타입 정의
export type DeliveryStatusType = "배송준비중" | "배송중" | "배송완료";

// API 배송 상태 타입 정의
export type ApiDeliveryStatusType = "ready" | "shipping" | "delivered";

// API 배송 상태를 표시용 배송 상태로 변환하는 함수
export const convertApiToDisplayStatus = (
    apiStatus: ApiDeliveryStatusType
): DeliveryStatusType => {
    switch (apiStatus) {
        case "ready":
            return "배송준비중";
        case "shipping":
            return "배송중";
        case "delivered":
            return "배송완료";
        default:
            return "배송준비중";
    }
};

interface DetailProductCardProps {
    title: string;
    orgPrice: string;
    finalPrice?: string;
    count: string;
    onClick?: () => void;
    productImage?: string;
    apiDeliveryStatus?: ApiDeliveryStatusType;
    deliveryStatus?: DeliveryStatusType;
}

const DetailProductCard: React.FC<DetailProductCardProps> = ({
    title,
    finalPrice,
    orgPrice,
    count,
    onClick,
    productImage = "/images/example.png",
    apiDeliveryStatus,
    deliveryStatus,
}) => {
    const getDeliveryStatusText = (): DeliveryStatusType => {
        if (apiDeliveryStatus) {
            return convertApiToDisplayStatus(apiDeliveryStatus);
        }
        if (deliveryStatus) {
            return deliveryStatus;
        }
        return "배송준비중";
    };

    const formatPrice = (price: string | undefined) => {
        if (price === undefined || price === null || price === "") return "0원";

        if (price.includes(",") && price.includes("원")) {
            return price;
        }

        const numericValue = price.replace(/[^0-9]/g, "");
        if (!numericValue) return "0원";

        const num = parseInt(numericValue, 10);
        return `${num.toLocaleString()}원`;
    };

    const extractNumber = (str: string | undefined): number => {
        if (!str) return 0;
        const numericValue = str.replace(/[^0-9]/g, "");
        return numericValue ? parseInt(numericValue, 10) : 0;
    };

    const formattedOrgPrice = formatPrice(orgPrice);
    const formattedFinalPrice = finalPrice
        ? formatPrice(finalPrice)
        : undefined;

    const hasDiscount =
        finalPrice !== undefined &&
        extractNumber(finalPrice) < extractNumber(orgPrice);
    const deliveryStatusText = getDeliveryStatusText();
    const isDeliveryCompleted = deliveryStatusText === "배송완료";

    return (
        <div className={cx("inputWrapper")}>
            <Image width={70} height={86} src={productImage} alt={title} />
            <div className={cx("productInfoWrap")}>
                <p className={cx("title")}>{title}</p>
                <div className={cx("priceWrap")}>
                    {hasDiscount ? (
                        <>
                            <p className={cx("orgPrice")}>
                                {formattedOrgPrice}
                            </p>
                            <p className={cx("finalPrice")}>
                                {formattedFinalPrice}
                            </p>
                        </>
                    ) : (
                        <p className={cx("orgPrice")}>{formattedOrgPrice}</p>
                    )}
                    <p className={cx("count")}>{count}</p>
                    <div className={cx("btnWrap")}>
                        <p
                            className={cx("deliveryStatus", {
                                completed: isDeliveryCompleted,
                                inProgress: !isDeliveryCompleted,
                            })}
                        >
                            {deliveryStatusText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProductCard;
