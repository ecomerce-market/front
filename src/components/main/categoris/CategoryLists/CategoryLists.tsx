"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoryLists.module.scss";
import cn from "classnames/bind";
import ProductCard from "@/components/productCard/productCard";
import {
  fetchAllProductData,
  fetchAllSortData,
  fetchSortData,
} from "@/utils/category/fetchCategory";
import { CategoriseGridProps } from "@/app/@types/product";
import { SORT_OPTIONS } from "@/lib/category/sortOption";

const cx = cn.bind(styles);

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

  const handleSort = async (sort: string) => {
    if (params == "65f2e1234567890123456801") {
      const allListSort = await fetchAllSortData(sort);
      const allListSortProducts = allListSort.products;
      setProducts(allListSortProducts);
      return;
    }
    const sorted = await fetchSortData(params, sort);

    const sortedProducts = sorted.products;
    setProducts(sortedProducts);
  };

  return (
    <div className={cx("list-container-wrapper")}>
      {products.length == 0 ? (
        <p className={cx("none-massege")}>해당 제품은 곧 입고 될 예정입니다.</p>
      ) : (
        <>
          <div className={cx("tab-bar")}>
            <p>총 {products.length} 개</p>
            <div className={cx("filter-bar")}>
              {SORT_OPTIONS.map((item) => (
                <span key={item.sort} onClick={() => handleSort(item.sort)}>
                  {item.name}
                </span>
              ))}
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
