// utils/fetchCategoryData.ts
import axios from "axios";

//카테고리 불러오기
export const fetchCategoryData = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3001/api/v1/products/categories"
    );
    return res.data;
  } catch (error) {
    console.error("카테고리 에러", error);
    throw error;
  }
};

//카테고리 상세 불러오기 (클릭시 해당 카테고리에 맞는 제품 나열 시키기 )
export const fetchCategoryDetailData = async (params: string | undefined) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/v1/products/categories?id=${params}`
    );
    return res.data;
  } catch (error) {
    console.error("카테고리 디테일 에러", error);
    throw error;
  }
};

export const fetchAllProductData = async (params: string | undefined) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/v1/products?categoryId=${params}`
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("카테고리 디테일 에러", error);
    throw error;
  }
};
