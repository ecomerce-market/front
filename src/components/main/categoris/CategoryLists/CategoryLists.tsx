"use client";

import React, { useEffect, useState } from "react";
import styles from "./CategoryLists.module.scss";
import cn from "classnames/bind";
import { Category } from "../categorisGrid";
import {
  fetchWeekendProducts,
  getRandomProducts,
} from "@/utils/main/fetchProduct";
import ProductCard from "@/components/productCard/productCard";

const cx = cn.bind(styles);

export type CategoriseGridProps = {
  sub: string;
  main: string;
  categoriesData: Category[];
};
// Category 타입 불러오고 적용

const CategoryLists = ({ main, sub, categoriesData }: CategoriseGridProps) => {
  //백엔드나오면 지우셈
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    console.log(main);
    console.log("categoriesData받아온값들", categoriesData); //전체 카테고리 배열들임

    //이 배열에서 필터로 해당 오브젝트 아이디 별 리스트 끌어내면 될듯
    //백엔드에 요청 필요
    //1. Products에 카테고리 필요할듯
    //2. Productcategories에 카테고리만 있고 상품이 없음
    //3. 카테고리 api에 childCategories, childProduct? 이렇게 있어야 할듯

    const listarr = categoriesData.filter((list) => {
      list.fullPath.split(">")[0] === main;
    });

    console.log("listarr", listarr);

    //백엔드나오면 이거 지우셈 예시로 한 거임!!!!!!!!!!!
    const productData = async () => {
      try {
        const allProducts = await fetchWeekendProducts(); // 데이터 호출
        setProducts(allProducts);
      } catch (error: any) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, [categoriesData, main]);
  return (
    <div className={cx("list-container-wrapper")}>
      <div className={cx("tab-bar")}>
        <p>총 n 개</p>
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
    </div>
  );
};

export default CategoryLists;
