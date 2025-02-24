import { Suspense } from "react";
import Detail from "./detail";
import cn from "classnames/bind";
import styles from "./detail.module.scss";
import React from "react";
const cx = cn.bind(styles);
//ssr연결 해봄
const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const res = await fetch(`http://localhost:3001/api/v1/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("상품 데이터를 불러오는 데 실패했습니다.");
    }

    const data = await res.json();

    return (
      <Suspense
        fallback={
          <p
            style={{
              paddingTop: "50px",
              textAlign: "center",
              color: "var(--main-color)",
            }}
          >
            "상품을 불러오는 중입니다...{" "}
          </p>
        }
      >
        <div className={cx("productPage-warp")}>
          <Detail id={id} data={data.product} />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error("상품 데이터 패칭 실패", error);
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;
  }
};

export default ProductPage;
