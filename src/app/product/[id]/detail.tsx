"use client";

import { DetailType } from "@/app/@types/product";
import Loading from "@/components/loading/loading";
import ProductDetail from "@/components/productCard/productDetail/productDetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductInfoList from "@/components/main/product/productInfoList/productInfoList";

const Detail = ({ params }: { params: string }) => {
  const router = useRouter();
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
    detailInfoHtml: "",
    info: {
      deliveryComp: "",
      deliveryInfo: "",
      packageType: "",
      productOrigin: "",
      seller: "",
    },
    commentCnt: 0,
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
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 500) {
            console.error("서버 오류 발생:", error.response.data);
            router.push("/not-found");
            return;
          }
        }
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [params, router]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* <ProductDetail
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
          /> */}
          {/* <ProductInfoList
            detailInfoHtml={data.detailInfoHtml}
            commentCnt={data.commentCnt}
          /> */}
        </>
      )}
    </div>
  );
};

export default Detail;
