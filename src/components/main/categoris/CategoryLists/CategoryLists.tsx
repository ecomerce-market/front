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
import { CategoriseGridProps, PopupItems } from "@/app/@types/product";
import { SORT_OPTIONS } from "@/lib/category/sortOption";
import Popup from "@/components/popup/popup";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const CategoryLists = ({
  params,
  main,
  categoriesData,
}: CategoriseGridProps) => {
  const [products, setProducts] = useState<[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>("RECOMMEND");

  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [selectedProduct, setSelectedProduct] = useState<PopupItems | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const productData = async () => {
      try {
        if (params == "65f2e1234567890123456801") {
          const allList = await fetchAllProductData();
          const allListProduct = allList.products;
          setProducts(allListProduct);
          return;
        }
        const allProducts = await fetchAllProductData(params); // 데이터 호출
        const filterProducts = allProducts.products;
        setProducts(filterProducts);
        console.log("allProducts", filterProducts);
      } catch (error) {
        console.error("상품리스트 404 에러", error);
      }
    };

    productData();
  }, [categoriesData, main, params]);

  const handleSort = async (sort: string) => {
    setSelectedSort(sort); //
    if (params == "65f2e1234567890123456801") {
      const allListSort = await fetchAllSortData(sort);
      const allListSortProducts = allListSort.products;
      setProducts(allListSortProducts);
      return;
    }
    const sorted = await fetchSortData(params, sort);
    const sortedProducts = sorted.products;
    setProducts(sortedProducts);
  };

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleRightBtnClick = (product: PopupItems) => {
    console.log("확인 버튼 클릭한 상품 객체:", product);
    // 확인 클릭한 상품 이거 나중에 장바구니로 보내면 될듯!!!!!!!!!!!!!!!!!!!!!!!!!!!
    alert(`${product.name}이(가) 장바구니에 추가 되었습니다.`);
    setShowPopup(false);
  };

  const handleDetail = (product: any) => {
    const detailId = product.productId;
    router.push(`/product/${detailId}`);
  };

  return (
    <div className={cx("list-container-wrapper")}>
      {products.length == 0 ? (
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
            {products.map(
              (list: {
                productId: React.Key | null | undefined;
                discount: {
                  discountType: string | undefined;
                  discountAmount: string | undefined;
                };
                name: string;
                finalPrice: string;
                orgPrice: string;
                commentCnt: string;
              }) => {
                return (
                  <ProductCard
                    key={list.productId}
                    width={"100"}
                    height={"100"}
                    discount={list.discount.discountAmount}
                    discountType={list.discount.discountType}
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
              }
            )}
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
          />
        </div>
      )}
    </div>
  );
};

export default CategoryLists;
