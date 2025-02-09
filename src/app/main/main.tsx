import Product from "@/components/main/product/product";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import React from "react";
const cx = cn.bind(styles);

const Main = () => {
  return (
    <div>
      <Product />
    </div>
  );
};

export default Main;
