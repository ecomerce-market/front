"use client";

import React, { useEffect } from "react";
import styles from "./CategoryLists.module.scss";
import cn from "classnames/bind";
import { Category } from "../categorisGrid";

const cx = cn.bind(styles);

export type CategoriseGridProps = {
  sub: string;
  main: string;
  categoriesData: Category[];
};
// Category 타입 불러오고 적용

const CategoryLists = ({ main, sub, categoriesData }: CategoriseGridProps) => {
  useEffect(() => {
    console.log(main);
    console.log("categoriesData받아온값들", categoriesData);

    const listarr = categoriesData.filter((list) => {
      list.fullPath.split(">")[0] === main;
    });

    console.log(listarr);
  }, [categoriesData, main]);
  return (
    <div>
      <h3>Selected Sub Category: {sub}</h3>
    </div>
  );
};

export default CategoryLists;
