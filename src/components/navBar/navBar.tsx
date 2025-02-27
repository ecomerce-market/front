"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./navBar.module.scss";
import cn from "classnames/bind";
import { TbMenu2 } from "react-icons/tb";
import Category from "../category/category";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const cx = cn.bind(styles);

const NavBar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNavbarControl = (Y: number, link: string) => {
    const handleScrollDown = (Y: number, link: string) => {
      if (pathname === "/main" || pathname === "/") {
        window.scrollBy({ top: Y, behavior: "smooth" });
      } else {
        router.push(link);
      }
    };
    handleScrollDown(Y, link);
  };

  return (
    <div className={cx("navBarWrapper")}>
      <div className={cx("navBar-container")}>
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
          <p onClick={() => handleNavbarControl(333, "/")}>마감세일</p>
          <p onClick={() => handleNavbarControl(600, "/")}>주말특가</p>
          <p onClick={() => handleNavbarControl(1000, "/")}>신상품</p>
          <p onClick={() => handleNavbarControl(600, "/")}>특가/혜택</p>
        </div>
        <Link href={"support/notice"}>
          <div className={cx("noticeCategory")}>
            <p>공지사항</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
