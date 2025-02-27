"use client";

import styles from "./categorisGrid.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryLists from "./CategoryLists/CategoryLists";

const cx = cn.bind(styles);
type Category = {
  depth: number;
  name: string;
  _id: string;
  fullPath: any;
};

type CategoriseGridProps = {
  main: string;
  sub: string;
  categoriesData: Category[];
  params: string;
};

const CategoriseGrid = ({
  params,
  main,
  sub,
  categoriesData,
}: CategoriseGridProps) => {
  const [sfc, setSfc] = useState<Category[]>([]);
  const [select, setSelect] = useState<string>("");

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

    setSelect(sub);
  }, [categoriesData, main, sub]);

  const handleClick = (categoryId: string) => {
    setSelect(categoryId);
    const mainTitleList = categoriesData.find((item) => item.name === main);
    if (categoryId === "all") {
      const mainID = mainTitleList?._id;
      router.push(`/main/collection/${mainID}`);
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
        <CategoryLists
          params={params}
          main={main}
          categoriesData={categoriesData}
        />
      </div>
    </div>
  );
};

export default CategoriseGrid;
