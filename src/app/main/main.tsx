import Product from "@/components/main/product/product";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import React from "react";
import WeekendProduct from "@/components/main/weekend/weekendProduct";
const cx = cn.bind(styles);

const Main = () => {
  return (
    <div className={cx("main-wrapper")}>
      <h2>마감세일</h2>
      <Product />
      <WeekendProduct />
    </div>
  );
};

export default Main;
