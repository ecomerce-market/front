import cn from "classnames/bind";
import styles from "./pickProductCard.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import TwoBtn from "@/components/btn/twoBtn";

const cx = cn.bind(styles);

interface PickProductCardProps {
    title: string;
    discountRate?: number;
    price: string;
    discountPrice?: string;
    leftTitle: ReactNode;
    rightTitle: ReactNode;
}

const PickProductCard: React.FC<PickProductCardProps> = ({
    title,
    discountPrice,
    discountRate,
    price,
    leftTitle,
    rightTitle,
}) => {
    return (
        <div className={cx("pickProductCardWrapper")}>
            <Image
                width={94}
                height={121}
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
                    <TwoBtn
                        leftTitle={leftTitle}
                        rightTitle={rightTitle}
                        leftBgColor={"--white"}
                        rightBgColor={"--main-color"}
                        leftBorder={"--black-200"}
                        rightBorder={"--main-color"}
                    />
                </div>
            </div>
        </div>
    );
};

export default PickProductCard;
