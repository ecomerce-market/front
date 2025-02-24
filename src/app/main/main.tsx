import Product from "@/components/main/product/product";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import React from "react";
import WeekendProduct from "@/components/main/weekend/weekendProduct";
import NewProduct from "@/components/main/newProduct/newProduct";
import BannerSwiper from "@/components/main/bannerSwiper/bannerSwiper";
const cx = cn.bind(styles);

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
