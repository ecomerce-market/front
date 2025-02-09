"use client";
import { FaAngleRight } from "react-icons/fa6"; // >
import styles from "./product.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/productCard";
const cx = cn.bind(styles);

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const productData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/products/new-products",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("상품을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        // 랜덤으로 4개만 추출
        const randomProducts = getRandomProducts(data.products, 4);
        setProducts(randomProducts);
        console.log(randomProducts);
      } catch (error: any) {
        throw new Error("상품리스트 404 에러");
      }
    };

    productData();
  }, []);

  // 배열에서 랜덤으로 n개의 아이템을 선택하는 함수
  const getRandomProducts = (array: any[], n: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random()); // 배열을 랜덤으로 섞음
    return shuffled.slice(0, n); // 랜덤으로 섞인 배열에서 첫 n개의 아이템을 반환
  };

  return (
    <div className={cx("product-wrapper")}>
      {products.map((list) => {
        return (
          <ProductCard
            key={list.productId}
            width={"100"}
            height={"100"}
            title={list.name}
            discountPrice={list.discount.discountAmount}
            price={`${list.finalPrice}원`}
            review={list.commentCnt}
            src={"/images/example.png"}
          />
        );
      })}
    </div>
  );
};

export default Product;
