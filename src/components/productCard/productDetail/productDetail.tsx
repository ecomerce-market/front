import cn from "classnames/bind";
import styles from "./productDetail.module.scss";
import React from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import DetailListInfo from "./detailListInfo/detailListInfo";

const cx = cn.bind(styles);

type ProductDetailProps = {
  mainTitle: string;
  subTitle: string;
  discountRate: string;
  discountPrice: string;
  originPrice: string;
  subsubTitle: string;
};

const ProductDetail = ({
  mainTitle,
  subTitle,
  discountRate,
  discountPrice,
  originPrice,
  subsubTitle,
}: ProductDetailProps) => {
  return (
    <div>
      <div className={cx("img-wrapper")}>
        <Image width={200} height={200} alt={"ex"} src={"/"} />
      </div>

      <div className={cx("info-wrapper")}>
        <div className={cx("title-info-wrapper")}>
          <p className={cx("main-title")}>{mainTitle}</p>
          <p className={cx("sub-title")}>{subTitle}</p>
          <span className={cx("discount-rate")}>{discountRate}</span>
          <span className={cx("discount-price")}>{discountPrice}</span>
          <p className={cx("origin-price")}>{originPrice}</p>
          <p className={cx("subsub-title")}>{subsubTitle}</p>
        </div>
      </div>

      <OneBtn title={"쿠폰 다운 받기"} width={"254"} />
      <div className="info-list">
        <DetailListInfo infoTitle={"배송"} infoDetail={""} />
        <DetailListInfo infoTitle={"판매자"} infoDetail={""} />
        <DetailListInfo infoTitle={"포장타입"} infoDetail={""} />
        <DetailListInfo infoTitle={"원산지"} infoDetail={""} />
      </div>
    </div>
  );
};

export default ProductDetail;
