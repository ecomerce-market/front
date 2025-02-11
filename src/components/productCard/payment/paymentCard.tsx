import cn from "classnames/bind";
import styles from "./paymentCard.module.scss";
import React from "react";
import Image from "next/image";

const cx = cn.bind(styles);

interface DetailProductCardProps {
    title: string;
    discountPrice?: string;
    price: string;
    count: string;

    onClick?: () => void;
}

const DetailProductCard: React.FC<DetailProductCardProps> = ({
    title,
    discountPrice,
    price,
    count,
}) => {
    return (
        <div className={cx("inputWrapper")}>
            <div className={cx("titleWrapper")}>
                <Image
                    width={70}
                    height={86}
                    src={"/images/example.png"}
                    alt={"example"}
                />
                <p className={cx("title")}>{title}</p>
            </div>
            <div className={cx("priceWrap")}>
                {discountPrice && (
                    <p className={cx("discountPrice")}>{discountPrice}</p>
                )}
                <p className={cx(discountPrice ? "price" : "discountPrice")}>
                    {price}원
                </p>
                <p className={cx("count")}>{count}개</p>
            </div>
        </div>
    );
};

export default DetailProductCard;
