"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./navBar.module.scss";
import cn from "classnames/bind";
import { TbMenu2 } from "react-icons/tb";
import Category from "../category/category";

const cx = cn.bind(styles);

const NavBar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  // 카테고리 컴포넌트 외부 클릭 시 카테고리 닫히게 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
        setIsCategoryActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
    setIsCategoryActive((prev) => !prev);
  };

  return (
    <div className={cx("navBarWrapper")}>
      <div className={cx("category")} ref={categoryRef}>
        <div
          className={cx("categoryIcon", {
            active: isCategoryActive,
          })}
          onClick={toggleCategory}
        >
          <TbMenu2 />
        </div>
        <div
          className={cx("categoryTitle", {
            active: isCategoryActive,
          })}
          onClick={toggleCategory}
        >
          카테고리
        </div>
        {isCategoryOpen && (
          <div className={cx("categoryContent")}>
            <Category />
          </div>
        )}
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

export default NavBar;
