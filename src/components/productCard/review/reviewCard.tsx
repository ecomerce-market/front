import cn from "classnames/bind";
import styles from "./pickProductCard.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import TwoBtn from "@/components/btn/twoBtn";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

interface reviewCardProps {
  title: string;
  discountRate: number;
  price: string;
  discountPrice: string;
  leftTitle: ReactNode;
  rightTitle: ReactNode;
}

const reviewCard: React.FC<reviewCardProps> = ({
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
          {/* 할인율 있을때랑 할인율이 없을 때 구별 */}
          {discountRate ? (
            <>
              <span className={cx("discountRate")}>{discountRate}%</span>
              <span className={cx("price")}>{price}원~</span>
              <span className={cx("discountPrice")}>{discountPrice}원</span>
            </>
          ) : (
            <p className={cx("price")}>{price}</p>
          )}
        </div>
        <div className={cx("btn")}>
          <OneBtn title={undefined} width={"155"} />
        </div>
      </div>
    </div>
  );
};

export default reviewCard;
