/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryLists.module.scss";
import cn from "classnames/bind";
import ProductCard from "@/components/productCard/productCard";
import {
  fetchAllProductData,
  fetchAllSortData,
  fetchSortData,
} from "@/utils/category/fetchCategory";
import { CategoriseGridProps } from "@/app/@types/product";
import { SORT_OPTIONS } from "@/lib/category/sortOption";
import Popup from "@/components/popup/popup";
import { useCart } from "@/hooks/useCart/useCart"; // useCart 훅 불러오기

const cx = cn.bind(styles);

const CategoryLists = ({ params }: CategoriseGridProps) => {
  const [products, setProducts] = useState<[]>([]);
  const {
    showPopup,
    selectedProduct,
    handleAddToCart,
    handlePopupClose,
    handleRightBtnClick,
    handleDetail,
  } = useCart();

  const [selectedSort, setSelectedSort] = useState<string | null>("RECOMMEND");

  useEffect(() => {
    const productData = async () => {
      try {
        let allProducts;
        if (params === "65f2e1234567890123456801") {
          allProducts = await fetchAllProductData();
        } else {
          allProducts = await fetchAllProductData(params);
        }
        setProducts(allProducts.products);
      } catch (error) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, [params]);

  const handleSort = async (sort: string) => {
    setSelectedSort(sort);
    let sortedProducts;
    if (params === "65f2e1234567890123456801") {
      sortedProducts = await fetchAllSortData(sort);
    } else {
      sortedProducts = await fetchSortData(params, sort);
    }
    setProducts(sortedProducts.products);
  };

  return (
    <div className={cx("list-container-wrapper")}>
      {products.length === 0 ? (
        <p className={cx("none-massege")}>해당 제품은 곧 입고 될 예정입니다.</p>
      ) : (
        <>
          <div className={cx("tab-bar")}>
            <p>총 {products.length} 개</p>
            <div className={cx("filter-bar")}>
              {SORT_OPTIONS.map((item) => (
                <span
                  key={item.sort}
                  className={cx("sort-item", {
                    active: selectedSort === item.sort,
                  })}
                  onClick={() => handleSort(item.sort)}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
          <div className={cx("list-grid")}>
            {products.map((product: any) => (
              <ProductCard
                key={product.productId}
                width={"100"}
                height={"100"}
                discount={product.discount.discountAmount}
                discountType={product.discount.discountType}
                title={product.name}
                discountPrice={`${product.finalPrice}원`}
                price={`${product.orgPrice}원`}
                review={product.commentCnt}
                src={"/images/example.png"}
                onAddToCart={() => handleAddToCart(product)}
                onDetail={() => handleDetail(product)}
              />
            ))}
          </div>
        </>
      )}

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
            isOpen={false}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryLists;
