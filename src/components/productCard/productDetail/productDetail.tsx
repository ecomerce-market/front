import cn from "classnames/bind";
import styles from "./productDetail.module.scss";
import React, { useState } from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import DetailListInfo from "./detailListInfo/detailListInfo";
import { ProductDetailProps } from "@/app/@types/product";
import CountForm from "@/app/product/countForm/countForm";
import { LuBell } from "react-icons/lu"; //벨
import { IoMdHeartEmpty } from "react-icons/io"; //하트

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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
            onSelectChange={setSelectedOption}
          />
        </div>

        <CountForm
          key={selectedOption}
          selectedProduct={selectedOption}
          discountPrice={discountPrice}
          originPrice={originPrice}
        />

        <div className={cx("btn-wrap")}>
          <OneBtn
            color="--main-color"
            bgcolor="--white"
            border="--main-color"
            borderSize="1"
            title={<IoMdHeartEmpty />}
            width={"50"}
            height={"46"}
            fontSize={"18"}
          />
          <OneBtn
            color="--main-color"
            bgcolor="--white"
            border="--main-color"
            borderSize="1"
            title={<LuBell />}
            width={"50"}
            height={"46"}
          />
          <OneBtn
            fontWeight="700"
            fontSize="19"
            title={"구매하기"}
            width={"343"}
            height={"46"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
