/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./newProduct.module.scss";
import cn from "classnames/bind";
import React from "react";
import Image from "next/image";
import { fetchNewProducts, getRandomProducts } from "@/utils/main/fetchProduct";
const cx = cn.bind(styles);

const NewProduct = async () => {
  let randomProducts: string | any[] = [];

  try {
    const allProducts = await fetchNewProducts();
    randomProducts = getRandomProducts(allProducts, 1);
    console.log(randomProducts);
  } catch (error: any) {
    console.error("상품리스트 404 에러", error);
  }

  return (
    <div className={cx("new-product-wrapper")}>
      <div className={cx("title-wrapper")}>
        <p className={cx("main-title")}>고객 반응으로 입증된 신상품</p>
        <p className={cx("sub-title")}>망설이면 늦어요</p>

        <p className="new-font">{randomProducts[0].name}</p>
      </div>

      <div className={cx("new-product-img-wrapper")}>
        {randomProducts.length > 0 && (
          <Image
            width={"410"}
            height={"307"}
            src={randomProducts[0].mainImgUrl}
            alt={randomProducts[0].name}
          />
        )}
      </div>
    </div>
  );
};

export default NewProduct;
