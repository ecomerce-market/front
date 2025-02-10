import CategoryList from "@/components/main/collection/category";
import styles from "./collection.module.scss";
import cn from "classnames/bind";
import React from "react";
const cx = cn.bind(styles);

const Collection = () => {
  return (
    <div className={cx("main-wrapper")}>
      <CategoryList />
    </div>
  );
};

export default Collection;
