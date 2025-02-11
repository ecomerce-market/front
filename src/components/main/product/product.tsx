"use client";
import { FaAngleRight } from "react-icons/fa6"; // >
import styles from "./product.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/productCard";
import {
  fetchWeekendProducts,
  getRandomProducts,
} from "@/utils/main/fetchProduct";
const cx = cn.bind(styles);

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);

  //신상품
  useEffect(() => {
    const productData = async () => {
      try {
        const allProducts = await fetchWeekendProducts(); // 데이터 호출
        const randomProducts = getRandomProducts(allProducts, 4); // 랜덤으로 3개만 추출
        setProducts(randomProducts);
      } catch (error: any) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, []);

  return (
    <div className={cx("product-wrapper")}>
      {products.map((list) => {
        return (
          <ProductCard
            key={list.productId}
            width={"100"}
            height={"100"}
            discount={list.discount.discountAmount}
            title={list.name}
            discountPrice={`${list.finalPrice}원`}
            price={`${list.orgPrice}원`}
            review={list.commentCnt}
            src={"/images/example.png"}
          />
        );
      })}
    </div>
  );
};

export default Product;
