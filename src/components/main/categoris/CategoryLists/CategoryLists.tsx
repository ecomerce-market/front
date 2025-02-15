"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoryLists.module.scss";
import cn from "classnames/bind";
import { Category } from "../categorisGrid";
import ProductCard from "@/components/productCard/productCard";
import { fetchAllProductData } from "@/utils/category/fetchCategory";

const cx = cn.bind(styles);

export type CategoriseGridProps = {
  main: string;
  categoriesData: Category[];
  params: string;
};
// Category 타입 불러오고 적용

const CategoryLists = ({
  params,
  main,
  categoriesData,
}: CategoriseGridProps) => {
  const [products, setProducts] = useState<[]>([]);

  useEffect(() => {
    const productData = async () => {
      try {
        //어차피 전체보기는 고정이니깐 하드코딩으로 박았음
        if (params == "65f2e1234567890123456801") {
          const allList = await fetchAllProductData();
          const allListProduct = allList.products;
          setProducts(allListProduct);
          return;
        }
        const allProducts = await fetchAllProductData(params); // 데이터 호출
        const filterProducts = allProducts.products;
        setProducts(filterProducts);
        console.log("allProducts", filterProducts);
      } catch (error) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, [categoriesData, main, params]);

  return (
    <div className={cx("list-container-wrapper")}>
      {products.length == 0 ? (
        <p>해당 제품은 곧 입고 될 예정입니다.</p>
      ) : (
        <>
          {" "}
          <div className={cx("tab-bar")}>
            <p>총 {products.length} 개</p>
            <div className={cx("filter-bar")}>
              <span>추천순</span>
              <span>신상품순</span>
              <span>판매량순</span>
              <span>혜택순</span>
              <span>낮은 가격 순</span>
              <span>높은 가격 순</span>
            </div>
          </div>
          <div className={cx("list-grid")}>
            {products.map(
              (list: {
                productId: React.Key | null | undefined;
                discount: { discountAmount: string | undefined };
                name: string;
                finalPrice: string;
                orgPrice: string;
                commentCnt: string;
              }) => {
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
              }
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryLists;
