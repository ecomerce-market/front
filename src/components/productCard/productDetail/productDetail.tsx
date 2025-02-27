import cn from "classnames/bind";
import styles from "./productDetail.module.scss";
import React from "react";
import { DetailProps } from "@/app/@types/product";
import ProductText from "./productText";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import DetailListInfo from "./detailListInfo/detailListInfo";
import DetailSelect from "./detailSelect";

const cx = cn.bind(styles);

export const ProductDetail = ({ id, data }: DetailProps) => {
  return (
    <div className={cx("product-wrapper")}>
      <div className={cx("img-wrapper")}>
        <Image width={200} height={300} alt={"ex"} src={`/`} />
      </div>
      <div className={cx("product-text-wrapper")}>
        <ProductText data={data} id={id} />
        <div className={cx("coupon-wrapper")}>
          <OneBtn
            title={"쿠폰 다운 받기"}
            bgcolor="--white"
            color="--main-color"
            border="--main-color"
            borderSize="1"
            height={"20"}
          />
        </div>

        <div className={cx("info-list")}>
          <DetailListInfo data={data.info} />
          <DetailSelect
            id={id}
            productName={data.productName}
            data={data.options}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
