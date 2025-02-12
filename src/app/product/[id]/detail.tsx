"use client";

import { DetailType } from "@/app/@types/product";
import Loading from "@/components/loading/loading";
import ProductDetail from "@/components/productCard/productDetail/productDetail";
import axios from "axios";
import { useEffect, useState } from "react";

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
          productName={Array(data.productName)}
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
