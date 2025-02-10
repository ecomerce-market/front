import cn from "classnames/bind";
import styles from "./review.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

interface reviewCardProps {
    title: string;
    discountRate?: number;
    price: string;
    discountPrice?: string;
    purchase: number;
    btntitle: ReactNode;
    btnwidth: string;
    btnColor: string;
    color: string;
    borderColor?: string;
    borderSize?: string;
    btnHeight: string;
    lateDate?: string;
}

const ReviewCard: React.FC<reviewCardProps> = ({
    title,
    discountPrice,
    discountRate,
    price,
    btntitle,
    btnwidth,
    btnHeight,
    color,
    borderColor,
    btnColor,
    lateDate,
}) => {
    return (
        <div className={cx("pickProductCardWrapper")}>
            <Image
                width={94}
                height={140}
                src={"/images/example.png"}
                alt={"example"}
            />

            <div className={cx("detailWrapper")}>
                <span className={cx("title")}>{title}</span>
                <div className={cx("priceWrapper")}>
                    {discountRate && discountPrice ? (
                        <>
                            <span className={cx("discountRate")}>
                                {discountRate}%
                            </span>
                            <span className={cx("discountPrice")}>
                                {discountPrice}원
                            </span>{" "}
                            <span className={cx("originalPrice")}>
                                {price}원~
                            </span>
                        </>
                    ) : (
                        <span className={cx("singlePrice")}>{price}원</span>
                    )}
                </div>
                <div className={cx("btn")}>
                    {lateDate && <span>{lateDate}일 남음</span>}
                    <OneBtn
                        color={color}
                        bgcolor={btnColor}
                        title={btntitle}
                        width={btnwidth}
                        height={btnHeight}
                        border={borderColor}
                        borderSize="1"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
