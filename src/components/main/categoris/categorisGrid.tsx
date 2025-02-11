"use client";

import styles from "./categorisGrid.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";
const cx = cn.bind(styles);

interface Category {
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
    // 카테고리 데이터를 필터링하여 'main'과 일치하는 카테고리만 추출
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

    // 로딩이 끝났을 때 로딩 상태를 false로 설정
    setLoading(false);

    // 페이지를 처음 로딩할 때, params로 받은 sub 값을 선택된 항목으로 설정
    setSelect(sub);
  }, [categoriesData, main, sub]); // sub 값도 의존성 배열에 추가

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

      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default CategoriseGrid;
