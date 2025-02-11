"use client";
import CategoriseGrid from "@/components/main/categoris/categorisGrid";
import { fetchCategoryData } from "@/utils/category/fetchCategory";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
  fullpath: string;
};

type CategoryProps = {
  params: string;
};

const Categorise = ({ params }: CategoryProps) => {
  const [mainCat, setMainCat] = useState<string>("");
  const [subCat, setSubCat] = useState<any>("");
  const [categoriesData, setCategoriesData] = useState<[]>([]);
  useEffect(() => {
    const getCategoryData = async () => {
      const data = await fetchCategoryData();
      const categories = data.categories;
      setCategoriesData(categories);
      console.log(categories);

      const categoryTitle = categories.find(
        (title: Category) => title._id === params
      );
      const categoriesFullPath = categoryTitle.fullPath;
      const maincategore = categoriesFullPath.split(">")[0];
      setMainCat(maincategore); //채소, 과일 이런거
      console.log("maincategore", categoryTitle);

      const subCategory = categories.find(
        (sub: { fullPath: string }) => sub.fullPath === maincategore
      );

      setSubCat(categoryTitle); //서브 카테고리 정보들들
      console.log("상세카테고리", categoryTitle);
      console.log("상세선택", categoryTitle.name);
      console.log("subCategory", subCategory);
      console.log("찾은값", maincategore);
    };

    getCategoryData();
  }, []);

  return (
    <div>
      <CategoriseGrid
        categoriesData={categoriesData}
        main={mainCat}
        sub={subCat._id}
      />
    </div>
  );
};

export default Categorise;
