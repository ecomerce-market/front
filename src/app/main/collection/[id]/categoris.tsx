"use client";
import CategoriseGrid from "@/components/main/categoris/categorisGrid";
import { fetchCategoryData } from "@/utils/category/fetchCategory";
import { useEffect, useState } from "react";

import styles from "./categoris.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type Category = {
  _id: string;
  name: string;
  fullpath: string;
  depth: number;
};

type CategoryProps = {
  params: string;
};

const Categorise = ({ params }: CategoryProps) => {
  const [mainCat, setMainCat] = useState<string>("");
  const [subCat, setSubCat] = useState<Category>({
    _id: "",
    name: "",
    fullpath: "",
    depth: 0,
  });
  const [categoriesData, setCategoriesData] = useState<[]>([]);

  useEffect(() => {
    const getCategoryData = async () => {
      const data = await fetchCategoryData();
      const categories = data.categories;
      setCategoriesData(categories);

      const categoryTitle = categories.find(
        (title: Category) => title._id === params
      );
      const categoriesFullPath = categoryTitle.fullPath;
      const maincategore = categoriesFullPath.split(">")[0];
      setMainCat(maincategore); //채소, 과일 이런거

      setSubCat(categoryTitle); //서브 카테고리 정보들들
    };

    getCategoryData();
  }, []);

  console.log("subCat", subCat);

  return (
    <div className={cx("categori-wrap")}>
      <CategoriseGrid
        categoriesData={categoriesData}
        main={mainCat}
        sub={subCat._id}
        params={params}
      />
    </div>
  );
};

export default Categorise;
