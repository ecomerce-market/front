import styles from "./noItems.module.scss";
import cn from "classnames/bind";
import React from "react";
const cx = cn.bind(styles);

const NoItems = () => {
  return (
    <div className={cx("no-item-wrapper")}>
      <p>마감 세일이 없습니다.</p>
    </div>
  );
};

export default NoItems;
