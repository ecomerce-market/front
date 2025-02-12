"use client";

import ProductDetail from "@/components/productCard/productDetail/productDetail";
import axios from "axios";
import { useEffect, useState } from "react";

export type DetailType = {
  discount: {
    discountAmount: string;
  };
  description: string;
  productName: string;
  orgPrice: string;
  finalPrice: string;
  info: {
    deliveryComp: string;
    deliveryInfo: string;
    packageType: string;
    productOrigin: string;
    seller: string;
  };
};

const Detail = ({ params }: { params: string }) => {
  const [data, setData] = useState<DetailType>({
    discount: {
      discountAmount: "",
    },
    description: "",
    productName: "",
    orgPrice: "",
    finalPrice: "",
    info: {
      deliveryComp: "",
      deliveryInfo: "",
      packageType: "",
      productOrigin: "",
      seller: "",
    },
  });

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/v1/products/${params}`
        );
        const productData = res.data.product;
        console.log("product", productData);
        setData(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProductData();
  }, [params]); // 변경됨
  return (
    <div>
      <h2>{params}</h2>
      <ProductDetail
        productData={data}
        imgSrc={"/"}
        mainTitle={data.productName}
        subTitle={data.description}
        discountRate={data.discount.discountAmount}
        discountPrice={data.finalPrice}
        originPrice={data.orgPrice}
        info={data.info}
      />
    </div>
  );
};

export default Detail;
