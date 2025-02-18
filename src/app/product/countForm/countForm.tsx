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
    if (counts[item] === 1) {
      setSelectedOptions((prev) =>
        prev.filter((selectedItem) => selectedItem !== item)
      );
      setCounts((prev) => ({ ...prev, [item]: 1 }));
      return;
    }
    setCounts((prev) => ({
      ...prev,
      [item]: prev[item] ? prev[item] - 1 : 1,
    }));
  };

  // 플러스 버튼 클릭
  const handlePlusCount = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCounts((prev) => ({
      ...prev,
      [item]: prev[item] ? prev[item] + 1 : 1,
    }));
  };

  return (
    <div>
      {selectedOptions.length > 0 && product ? (
        <div>
          {selectedOptions.map((item, index) => {
            const selectedOption = product.options.find(
              (opt) => opt.optName === item
            );
            const price = selectedOption
              ? selectedOption.optOrgPrice + selectedOption.additionalPrice
              : product.finalPrice;

            return (
              <div key={index}>
                {item}
                <div>
                  <span onClick={(e) => handleMinusCount(item, e)}> - </span>
                  <span> {counts[item] || 1} </span> {/* 개별 상품의 수량 */}
                  <span onClick={(e) => handlePlusCount(item, e)}> + </span>
                </div>

                <div>
                  <span>
                    {(price * (counts[item] || 1)).toLocaleString()} 원
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* 최종가격 보낼거임 */}
      <div>
        <ResultPart />
      </div>
    </div>
  );
};

export default CountForm;
