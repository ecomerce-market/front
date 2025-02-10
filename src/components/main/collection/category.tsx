"use client";
import React, { useEffect, useState } from "react";
import { fetchCategoryData } from "@/utils/category/fetchCategory"; // 모듈화된 함수 임포트

const CategoryComponent = () => {
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const data = await fetchCategoryData();
        setCategoryData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategoryData();
  }, []);

  return (
    <div>
      <h1>카테고리 목록</h1>
    </div>
  );
};

export default CategoryComponent;
