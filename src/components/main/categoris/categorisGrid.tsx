"use client";

import styles from "./categorisGrid.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryLists from "./CategoryLists/CategoryLists";
const cx = cn.bind(styles);

export interface Category {
  depth: number;
  fullPath: string;
  name: string;
  _id: string;
}

type CategoriseGridProps = {
  main: string;
  sub: string;
  categoriesData: Category[];
};

const CategoriseGrid = ({ main, sub, categoriesData }: CategoriseGridProps) => {
  const [sfc, setSfc] = useState<Category[]>([]);
  const [select, setSelect] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const filterCat = categoriesData.filter(
      (list) => list.fullPath.split(">")[0] === main
    );
    const sliceFilterCat = filterCat.slice(1);
    sliceFilterCat.unshift({
      depth: 1,
      fullPath: "전체보기",
      name: "전체보기",
      _id: "all",
    });
    setSfc(sliceFilterCat);

    setLoading(false);

    setSelect(sub);
  }, [categoriesData, main, sub]);

  const handleClick = (categoryId: string) => {
    setSelect(categoryId);
    const mainTitleList = categoriesData.find((item) => item.name === main);
    if (categoryId === "all") {
      router.push(`/main/collection/${mainTitleList?._id}`);
    } else {
      router.push(`/main/collection/${categoryId}`);
    }
  };

  return (
    <div className={cx("category-wrapper")}>
      <p className={cx("main-title")}>{main}</p>

      <div className={cx("sub-title-grid")}>
        {sfc.map((list) => (
          <div
            className={cx("category-item", {
              selected: select === list._id,
              mainColor: select === list._id,
            })}
            key={list._id}
            onClick={() => handleClick(list._id)}
          >
            {list.name}
          </div>
        ))}
      </div>

      <div>
        <CategoryLists main={main} sub={sub} categoriesData={categoriesData} />
      </div>
    </div>
  );
};

export default CategoriseGrid;
