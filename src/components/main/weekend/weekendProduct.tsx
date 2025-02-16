/* eslint-disable @typescript-eslint/no-explicit-any */
// WeekendProduct.tsx
"use client";
import styles from "./weekendProduct.module.scss";
import cn from "classnames/bind";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/productCard/productCard";
import {
  fetchWeekendProducts,
  getRandomProducts,
} from "@/utils/main/fetchProduct";

import { useCart } from "@/hooks/useCart/useCart";
import Popup from "@/components/popup/popup";
const cx = cn.bind(styles);

const WeekendProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const {
    showPopup,
    selectedProduct,
    handleAddToCart,
    handlePopupClose,
    handleRightBtnClick,
    handleDetail,
  } = useCart();

  useEffect(() => {
    const weekendData = async () => {
      try {
        const allProducts = await fetchWeekendProducts(); // 데이터 호출
        const randomProducts = getRandomProducts(allProducts, 3); // 랜덤으로 3개만 추출
        setProducts(randomProducts);
      } catch (error: any) {
        console.error("상품리스트 404 에러", error);
      }
    };

    weekendData(); // 데이터 로딩
  }, []);

  return (
    <div className={cx("product-wrapper")}>
      <div className={cx("weekendTime")}>
        <h4 className={cx("main-title")}>주말특가</h4>
        <p className={cx("time-title")}>48시간 한정 특가!</p>
        <p className={cx("timer")}>10 : 51 : 36</p>
        <p className={cx("sub-title")}>망설이면 늦어요</p>
      </div>
      {products.map((list) => {
        return (
          <ProductCard
            key={list.productId}
            width={"100"}
            height={"100"}
            discount={list.discount?.discountAmount}
            title={list.name}
            discountPrice={`${list.finalPrice}원`}
            price={`${list.orgPrice}원`}
            review={list.commentCnt}
            src={"/images/example.png"}
            onAddToCart={() => handleAddToCart(list)}
            onDetail={() => {
              handleDetail(list);
            }}
          />
        );
      })}

      {showPopup && selectedProduct && (
        <div className={cx("popup-wrapper")}>
          <Popup
            title={`${selectedProduct.name}을{를} 장바구니에 추가할까요?`}
            leftBtn={"취소"}
            rightBtn={"확인"}
            leftBtnHref="#"
            rightBtnHref="#"
            onClose={handlePopupClose}
            onRightBtnClick={() => handleRightBtnClick(selectedProduct)}
          />
        </div>
      )}
    </div>
  );
};

export default WeekendProduct;
