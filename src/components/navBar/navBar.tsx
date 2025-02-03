import React from "react";
import styles from "./navBar.module.scss";
import cn from "classnames/bind";
import { TbMenu2 } from "react-icons/tb";

const cx = cn.bind(styles);

const navBar = () => {
    return (
        <div className={cx("navBarWrapper")}>
            <div className={cx("category")}>
                <div className={cx("categoryIcon")}>
                    <TbMenu2 />
                </div>
                <div className={cx("categorytitle")}>카테고리</div>
            </div>
            <div className={cx("subCategory")}>
                <p>신상품</p>
                <p>베스트</p>
                <p>알뜰쇼핑</p>
                <p>특가/혜택</p>
            </div>
        </div>
    );
};

export default navBar;
