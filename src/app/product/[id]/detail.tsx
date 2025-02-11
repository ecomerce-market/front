"use client"; // 클라이언트 컴포넌트에서 비동기 데이터 처리 가능

import { useEffect, useState } from "react";
import ProductDetail from "@/components/productCard/productDetail/productDetail";
import { fetchWeekendProducts } from "@/utils/main/fetchProduct";
import axios, { all } from "axios";

const Detail = ({ params }: { params: { id: string } }) => {
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setProductId(params.id);
      console.log(params.id);
    }

    const productData = async () => {
      try {
        const res = await axios("");
      } catch (error: any) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, [params]);

  return (
    <div>
      <ProductDetail
        mainTitle={""}
        subTitle={""}
        discountRate={""}
        discountPrice={""}
        originPrice={""}
        subsubTitle={""}
      />
    </div>
  );
};

export default Detail;
