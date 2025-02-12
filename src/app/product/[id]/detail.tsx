"use client";

import Loading from "@/components/loading/loading";
import ProductDetail from "@/components/productCard/productDetail/productDetail";
import axios from "axios";
import { useEffect, useState } from "react";

export type DetailType = {
  discount: {
    discountAmount: string;
    discountType: string;
  };
  description: string;
  productName: string;
  orgPrice: string;
  finalPrice: string;
  mainImgUrl: string;
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
      discountType: "",
      discountAmount: "",
    },
    description: "",
    productName: "",
    orgPrice: "",
    finalPrice: "",
    mainImgUrl: "",
    info: {
      deliveryComp: "",
      deliveryInfo: "",
      packageType: "",
      productOrigin: "",
      seller: "",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/v1/products/${params}`
        );
        const productData = res.data.product;
        console.log("product", productData);
        setData(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    getProductData();
  }, [params]); // 변경됨

  if (loading) {
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ProductDetail
          productData={data}
          imgSrc={data.mainImgUrl}
          mainTitle={data.productName}
          subTitle={data.description}
          discountRate={data.discount.discountAmount}
          discountType={data.discount.discountType}
          discountPrice={data.finalPrice}
          originPrice={data.orgPrice}
          info={data.info}
        />
      )}
    </div>
  );
};

export default Detail;
