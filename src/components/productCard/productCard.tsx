import React from "react";
import styles from "./productCard.module.scss";
import cn from "classnames/bind";
import { IoBasketSharp, IoChatboxEllipsesOutline } from "react-icons/io5";

interface ProductCardProps {
  // 카드 넓이 값
  width: string;
  // 카드 높이 값
  height: string;
  // 상품 명
  title: string;
  //상품 명 상단 설명
  detail?: string;
  // 할인율
  discount?: string;
  // 할인 가격
  discountPrice?: string;
  // 원가
  price: string;
  // 후기
  review: string;
  src: string;
  alt?: string;
  onAddToCart?: () => void;
  onDetail?: () => void;
}

const cx = cn.bind(styles);

const ProductCard = (props: ProductCardProps) => {
  const {
    width,
    src,
    height,
    title,
    detail,
    discount,
    discountPrice,
    price,
    review,
    alt,
    onAddToCart,
    onDetail,
  } = props;

  // discount와 discountPrice가 없는 경우 "price"에 discountPrice 스타일 적용
  const priceClass = discount && discountPrice ? "price" : "discountPrice";

  return (
    <div className={cx("productCardWrapper")} style={{ width }}>
      <div onClick={onDetail} className={cx("imageWrapper")}>
        <img
          src={src}
          alt={alt}
          className={cx("titleImage")}
          style={{ width, height }}
        />
        <div className={cx("basketIconWrapper")}>
          <IoBasketSharp onClick={onAddToCart} />
        </div>
      </div>
      <div className={cx("productInfo")}>
        <div className={cx("productTitleDetail")}>{detail}</div>
        <div className={cx("productTitle")}>{title}</div>
        <div className={cx("priceWrapper")}>
          {discount && discountPrice ? (
            <div className={cx("discountWrapper")}>
              <div className={cx("discount")}>{discount}</div>
              <div className={cx("discountPrice")}>{discountPrice}</div>
            </div>
          ) : null}
          <div className={cx(priceClass)}>{price}</div>
        </div>
        <div className={cx("review")}>
          <IoChatboxEllipsesOutline />
          후기 {review}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
