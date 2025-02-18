import { DetailProps } from "@/app/@types/product";
import cn from "classnames/bind";
import styles from "./productText.module.scss";
import React from "react";

const cx = cn.bind(styles);

const ProductText = ({ data }: DetailProps) => {
  return (
    <div className={cx("info-container")}>
      <div className={cx("info-wrapper")}>
        <div className={cx("title-info-wrapper")}>
          <p className={cx("main-title")}>{data.productName}</p>
          <p className={cx("sub-title")}>{data.description}</p>
          {data.discount.discountAmount ? (
            <>
              <span className={cx("discount-rate")}>
                {data.discount.discountAmount}
                {data.discount.discountType === "won" ? "원" : "%"}
              </span>
              <span className={cx("discount-price")}>{data.finalPrice}원</span>
              <p className={cx("origin-price")}>
                {data.discount.discountAmount}원
              </p>
            </>
          ) : (
            <p className={cx("origin-price-real")}>{data.orgPrice}원</p>
          )}
          {data.canReward ? null : (
            <p className={cx("reward-title")}>적립 제외 상품입니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductText;
