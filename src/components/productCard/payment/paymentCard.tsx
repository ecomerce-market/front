import cn from "classnames/bind";
import styles from "./paymentCard.module.scss";
import React from "react";
import Image from "next/image";

const cx = cn.bind(styles);

interface PaymentCardProps {
    productName: string;
    optionName?: string;
    orgPrice: number;
    finalPrice?: number;
    amount: number;
    mainImgUrl?: string;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
    productName,
    optionName,
    orgPrice,
    finalPrice,
    amount,
    mainImgUrl,
}) => {
    const formatPrice = (price: number) => {
        return price.toLocaleString("ko-KR");
    };

    // 총 가격 계산
    const totalOrgPrice = orgPrice * amount;
    const totalFinalPrice = finalPrice ? finalPrice * amount : totalOrgPrice;

    return (
        <div className={cx("inputWrapper")}>
            <div className={cx("titleWrapper")}>
                <Image
                    width={70}
                    height={86}
                    src={"/images/example.png"}
                    alt={productName}
                />
                <div className={cx("productInfo")}>
                    <p className={cx("title")}>
                        {productName}
                        {optionName && (
                            <span className={cx("option")}>
                                {" "}
                                - {optionName}
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <div className={cx("priceWrap")}>
                {finalPrice && finalPrice !== orgPrice && (
                    <p className={cx("discountPrice")}>
                        {formatPrice(totalFinalPrice)}원
                    </p>
                )}
                <p
                    className={cx(
                        finalPrice && finalPrice !== orgPrice
                            ? "price"
                            : "discountPrice"
                    )}
                >
                    {formatPrice(totalOrgPrice)}원
                </p>
                <p className={cx("count")}>{amount}개</p>
            </div>
        </div>
    );
};

export default PaymentCard;
