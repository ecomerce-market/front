import cn from "classnames/bind";
import styles from "./product.module.scss";
import React from "react";
import Image from "next/image";

const cx = cn.bind(styles);

interface DetailProductCardProps {
    title: string;
    discountPrice?: string;
    price: string;
    count: string;
    complete: boolean;
    onClick?: () => void;
}

const DetailProductCard: React.FC<DetailProductCardProps> = ({
    title,
    discountPrice,
    price,
    count,
    complete,
}) => {
    return (
        <div className={cx("inputWrapper")}>
            <Image
                width={70}
                height={86}
                src={"/images/example.png"}
                alt={"example"}
            />
            <div className={cx("productInfoWrap")}>
                <p className={cx("title")}>{title}</p>
                <div className={cx("priceWrap")}>
                    {discountPrice && (
                        <p className={cx("discountPrice")}>{discountPrice}</p>
                    )}
                    <p
                        className={cx(
                            discountPrice ? "price" : "discountPrice"
                        )}
                    >
                        {price}
                    </p>
                    <p className={cx("count")}>{count}</p>
                </div>
            </div>
            <div className={cx("btnWrap")}>
                {complete ? <p>배송완료</p> : <p>배송중</p>}
            </div>
        </div>
    );
};

export default DetailProductCard;
