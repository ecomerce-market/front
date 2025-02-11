// utils/fetchCategoryData.ts
import axios from "axios";

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
