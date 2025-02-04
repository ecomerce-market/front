import cn from "classnames/bind";
import styles from "./product.module.scss";
import React from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
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
  onClick,
}) => {
  return (
    <div className={cx("inputWrapper")}>
      <Image
        width={42}
        height={55}
        src={"/images/example.png"}
        alt={"example"}
      ></Image>
      <div className={cx("productInfoWrap")}>
        <p className={cx("title")}>{title}</p>
        <div className={cx("priceWrap")}>
          <p className={cx("discountPrice")}>{discountPrice}</p>
          <p className={cx("price")}>{price}</p>
          <p className={cx("count")}>{count}</p>
        </div>
      </div>

      <div className={cx("btnWrap")}>
        {complete ? <p>배송완료</p> : <p>배송중</p>}
        <OneBtn
          onClick={onClick}
          title={"장바구니 담기"}
          width={"74"}
          height={"28"}
          fontSize={"6"}
          padding="12px 15px"
          color="--main-color"
          border="--main-color"
          borderSize="2"
          bgcolor="--white"
          fontWeight="600"
        />
      </div>
    </div>
  );
};

export default DetailProductCard;
