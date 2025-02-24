import dynamic from "next/dynamic";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import React from "react";
import BannerSwiper from "@/components/main/bannerSwiper/bannerSwiper";

const cx = cn.bind(styles);

const Product = dynamic(() => import("@/components/main/product/product"), {
  loading: () => <p>상품 불러오는 중...</p>,
});
const WeekendProduct = dynamic(
  () => import("@/components/main/weekend/weekendProduct"),
  {
    loading: () => <p>주말 특가 불러오는 중...</p>,
  }
);
const NewProduct = dynamic(
  () => import("@/components/main/newProduct/newProduct"),
  {
    loading: () => <p>신상품 불러오는 중...</p>,
  }
);

const Main = () => {
  return (
    <div className={cx("main-wrapper")}>
      <BannerSwiper />

      <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>마감세일</h2>

      <Product />
      <WeekendProduct />
      <NewProduct />
    </div>
  );
};

export default Main;
