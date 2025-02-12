import cn from "classnames/bind";
import styles from "./productDetail.module.scss";
import React from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import DetailListInfo from "./detailListInfo/detailListInfo";
import { ProductDetailProps } from "@/app/@types/product";

const cx = cn.bind(styles);

export const ProductDetail = ({
  mainTitle,
  subTitle,
  discountType,
  discountRate,
  discountPrice,
  originPrice,
  subsubTitle,
  productName,
  info,
}: ProductDetailProps) => {
  console.log(info);

  return (
    <div className={cx("product-wrapper")}>
      <div className={cx("img-wrapper")}>
        <Image width={200} height={300} alt={"ex"} src={`/`} />
      </div>

      <div className={cx("info-container")}>
        <div className={cx("info-wrapper")}>
          <div className={cx("title-info-wrapper")}>
            <p className={cx("main-title")}>{mainTitle}</p>
            <p className={cx("sub-title")}>{subTitle}</p>
            {discountRate && discountPrice ? (
              <>
                <span className={cx("discount-rate")}>
                  {discountRate}
                  {discountType === "won"
                    ? "원"
                    : discountType === "per"
                    ? "%"
                    : ""}
                </span>
                <span className={cx("discount-price")}>{discountPrice}원</span>
                <p className={cx("origin-price")}>{originPrice}원</p>
              </>
            ) : (
              <p className={cx("origin-price-real")}>{originPrice}원</p>
            )}

            <p className={cx("subsub-title")}>{subsubTitle}</p>
          </div>
        </div>

        <OneBtn
          title={"쿠폰 다운 받기"}
          bgcolor="--white"
          color="--main-color"
          border="--main-color"
          borderSize="1"
          width={"254"}
          height={"20"}
        />
        <div className={cx("info-list")}>
          <DetailListInfo
            infoTitle={"배송"}
            subDetail={info.deliveryInfo}
            infoDetail={info.deliveryComp}
          />
          <DetailListInfo infoTitle={"판매자"} infoDetail={info.seller} />
          <DetailListInfo
            infoTitle={"포장타입"}
            infoDetail={info.packageType}
          />
          <DetailListInfo
            infoTitle={"원산지"}
            infoDetail={info.productOrigin}
          />
          <DetailListInfo
            infoTitle={"상품선택"}
            showInfo={false}
            showSelect={true}
            selectOptions={productName}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
