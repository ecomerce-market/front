"use client";

import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./countForm.module.scss";
import ResultPart from "@/components/productCard/productDetail/resultPart";

const cx = cn.bind(styles);

type Option = {
  optName: string;
  optOrgPrice: number;
  additionalPrice: number;
  optAmount: number;
  _id: string;
};

type Product = {
  productName: string;
  productId: string;
  finalPrice: number;
  options: Option[];
};

type countFormProps = {
  id: string;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const CountForm = ({
  id,
  selectedOptions,
  setSelectedOptions,
}: countFormProps) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/v1/products/${id}`);
        if (!res.ok) {
          throw new Error("상품 데이터를 불러오는 데 실패했습니다.");
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("상품 데이터 패칭 실패", error);
      }
    };

    getData();
  }, [id]);

  // 마이너스 버튼 클릭
  const handleMinusCount = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts((prev) => {
      const updatedCounts = { ...prev };
      if (updatedCounts[item] > 1) {
        updatedCounts[item] -= 1;
      } else {
        // 수량이 1일 때는 selectedOptions에서 제거
        setSelectedOptions((prevSelected) =>
          prevSelected.filter((selectedItem) => selectedItem !== item)
        );
        updatedCounts[item] = 1; // 최소 1로 유지
      }
      return updatedCounts;
    });
  };

  // 플러스 버튼 클릭
  const handlePlusCount = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts((prev) => ({
      ...prev,
      [item]: (prev[item] || 1) + 1, // 기본값 1로 설정하여 1부터 증가
    }));
  };

  // 서버에 데이터를 보내는 부분에서 counts를 올바르게 사용하기
  const handlePostData = async () => {
    if (!product) return;

    try {
      let products = [];

      if (product.options.length === 0 || selectedOptions.length === 0) {
        // 옵션이 없거나 선택된 옵션이 없을 경우
        products = [
          {
            productId: product.productId,
            amount: 1,
            optionName: "", // 공란 처리
          },
        ];
      } else {
        products = selectedOptions.map((option) => {
          const matchedOption = product.options.find(
            (opt) => opt.optName === option
          );

          return {
            productId: product.productId,
            amount: counts[option] || 1, // counts에서 올바른 값 사용
            optionName:
              matchedOption && product.productName === matchedOption.optName
                ? ""
                : option,
          };
        });
      }

      console.log("서버로 보내는 데이터:", { products });

      // 서버로 보내는 코드
      const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("서버 오류 응답:", errorData);
        throw new Error(
          `HTTP error ${response.status}: ${errorData?.message || ""}`
        );
      }

      const data = await response.json();
      console.log("주문 성공:", data);
      alert("주문이 완료되었습니다.");
    } catch (error) {
      console.error("주문 요청 실패:", error);
      alert(
        `주문 처리 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    }
  };

  return (
    <div className={cx("count-wrapper")}>
      {selectedOptions.length > 0 && product ? (
        <div className={cx("selected-wrapper")}>
          {selectedOptions.map((item, index) => {
            const selectedOption = product.options.find(
              (opt) => opt.optName === item
            );
            const price = selectedOption
              ? selectedOption.optOrgPrice + selectedOption.additionalPrice
              : product.finalPrice;

            return (
              <div className={cx("selected-list")} key={index}>
                <div className={cx("selected-title")}>{item}</div>

                <div className={cx("products-count-wrapper")}>
                  <span
                    className={cx("count-pointer")}
                    onClick={(e) => handleMinusCount(item, e)}
                  >
                    {" "}
                    -{" "}
                  </span>
                  <span className={cx("count-number")}>
                    {" "}
                    {counts[item] || 1}{" "}
                  </span>{" "}
                  {/* 개별 상품의 수량 */}
                  <span
                    className={cx("count-pointer")}
                    onClick={(e) => handlePlusCount(item, e)}
                  >
                    {" "}
                    +{" "}
                  </span>
                </div>

                <div className={cx("price-wrapper")}>
                  <span>
                    {(price * (counts[item] || 1)).toLocaleString()}원
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <div>
        <ResultPart
          product={product}
          selectedOptions={selectedOptions}
          counts={counts}
        />
      </div>
    </div>
  );
};

export default CountForm;
