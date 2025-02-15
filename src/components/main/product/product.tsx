/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "./product.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/productCard";
import {
  fetchLastProducts,
  getRandomProducts,
} from "@/utils/main/fetchProduct";
import NoItems from "../noItems";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [productList, setProductList] = useState<[]>([]);
  const router = useRouter();

  //마감 상품
  useEffect(() => {
    const productData = async () => {
      try {
        const allProducts = await fetchLastProducts(); // 데이터 호출
        const randomProducts = getRandomProducts(allProducts, 4); // 랜덤으로 3개만 추출
        console.log(allProducts);
        setProductList(allProducts);
        setProducts(randomProducts);
      } catch (error: any) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, []);
  const handleDetail = (product: any) => {
    const detailId = product.productId;
    router.push(`/product/${detailId}`);
  };

  return (
    <div className={cx("product-wrapper")}>
      {productList.length === 0 ? (
        <div>
          <NoItems />
        </div>
      ) : (
        <>
          {" "}
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
                onDetail={() => {
                  handleDetail(list);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Product;
