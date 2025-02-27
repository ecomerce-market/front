"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./resultPart.module.scss";

import OneBtn from "@/components/btn/oneBtn";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuBell } from "react-icons/lu";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type ResultPartProps = {
  selectedOptions: string[];
  product: any;
  counts: { [key: string]: number };
};

const ResultPart = ({ selectedOptions, counts, product }: ResultPartProps) => {
  const [result, setResult] = useState<
    {
      count: number;
      name: string;
      price: number;
      resultTotalPrice: number;
    }[]
  >([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!product) return;

    const newResult = selectedOptions.map((option) => {
      const matchedOption = product.options?.find(
        (opt: { optName: string }) => opt.optName === option
      );

      const count = counts[option] || 1;
      const price = matchedOption
        ? matchedOption.optOrgPrice + matchedOption.additionalPrice
        : product.finalPrice;

      return {
        name: option,
        count: count,
        price: price,
        resultTotalPrice: count * price,
      };
    });

    setResult(newResult);
  }, [selectedOptions, counts, product]);

  const handlePostData = async () => {
    if (!product) return;

    try {
      let products = [];

      if (selectedOptions.length === 0) {
        alert("상품을 선택해 주세요!");
        return;
      }

      if (product.options.length === 0) {
        // 옵션이 없거나 선택된 옵션이 없을 경우
        const resultCount = result.length > 0 ? result[0].count : 1;
        products = [
          {
            productId: product.productId,
            amount: counts[""] || resultCount || 1,
            optionName: "", // 공란 처리
          },
        ];
      } else {
        products = selectedOptions.map((option) => {
          const matchedOption = product.options.find(
            (opt: { optName: string }) => opt.optName === option
          );

          // counts[option]이 존재하면 그 값을 사용, 없으면 기본값 1을 사용
          const count = counts[option] || 1;

          return {
            productId: product.productId,
            amount: count, // 업데이트된 카운트를 사용
            optionName:
              matchedOption && product.productName === matchedOption.optName
                ? "" // 공란 설정
                : option,
          };
        });
      }

      console.log("서버로 보내는 데이터:", { products });

      const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
      console.log("주문 성공 :", data);
      const id = data.order.orderId;
      console.log("주문 성공 id:", id);
      alert("주문이 완료되었습니다.");
      router.push(`http://localhost:3000/payment/${id}`);
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
    <div className={cx("resultPart-wrapper")}>
      <h3>
        총 상품금액 :
        <span>
          {result
            .reduce((sum, item) => sum + item.price * item.count, 0)
            .toLocaleString()}
          원
        </span>
      </h3>
      <div className={cx("btn-wrap")}>
        <div className={cx("option-btn")}>
          <OneBtn
            color="--main-color"
            bgcolor="--white"
            border="--main-color"
            borderSize="1"
            title={<IoMdHeartEmpty />}
            height={"46"}
            fontSize={"18"}
          />
          <OneBtn
            color="--main-color"
            bgcolor="--white"
            border="--main-color"
            borderSize="1"
            title={<LuBell />}
            height={"46"}
          />
        </div>

        <div className={cx("buy")}>
          <OneBtn
            onClick={handlePostData}
            fontWeight="700"
            fontSize="19"
            title={"구매하기"}
            height={"46"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPart;
