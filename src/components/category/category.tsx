"use client";
import React, { useEffect, useState } from "react";
import styles from "./category.module.scss";
import cn from "classnames/bind";
import { fetchCategoryData } from "@/utils/category/fetchCategory";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const Category = () => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState<any[]>([]); // 전체 카테고리 데이터
  const [selected, setSelected] = useState<any | null>(null); // 선택된 카테고리
  const [mainCategories, setMainCategories] = useState<any[]>([]); // 대분류
  const [subCategories, setSubCategories] = useState<any[]>([]); // 중분류

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const data = await fetchCategoryData();
        const categories = data.categories;

        // depth가 1 = 대분류
        const mainCats = categories.filter((cat: any) => cat.depth === 1);
        setMainCategories(mainCats);

        // depth가 2 = 중분류
        const subCats = categories.filter((cat: any) => cat.depth === 2);
        setSubCategories(subCats);

        setSelected(mainCats[0]);

        console.log("대분류:", mainCats);
        console.log("중분류:", subCats);
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    getCategoryData();
  }, []);

  const handleCategoryClick = (category: any) => {
    setSelected(category);
  };

  const handleSubcategoryClick = (category: any) => {
    console.log("카테코리", category);
    router.push(`/main/collection/${category._id}`);
  };

  const filteredSubCategories = subCategories.filter((subCat) => {
    return subCat.fullPath.includes(selected?.name);
  });

  return (
    <div className={cx("container")}>
      {/* 대분류 */}
      <div className={cx("sidebar")}>
        <h2 className={cx("title")}>카테고리</h2>
        <ul>
          {mainCategories.map((cat) => (
            <li
              key={cat._id}
              className={cx("categoryItem", {
                active: selected && selected._id === cat._id,
              })}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
      {/* 중분류 */}
      {selected && (
        <div className={cx("content")}>
          <h2 className={cx("title")}>{selected.name}</h2>

          <ul className={cx("subcategories")}>
            {filteredSubCategories.map((sub: any) => (
              <li
                onClick={() => handleSubcategoryClick(sub)}
                key={sub._id}
                className={cx("subcategoryItem")}
              >
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Category;
