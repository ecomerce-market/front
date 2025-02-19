"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./resultPart.module.scss";

import OneBtn from "@/components/btn/oneBtn";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuBell } from "react-icons/lu";

const cx = cn.bind(styles);

type ResultPartProps = {
  selectedOptions: string[];
  product: any;
  counts: { [key: string]: number };
};

const ResultPart = ({ selectedOptions, counts, product }: ResultPartProps) => {
  const [result, setResult] = useState<
    { count: number; name: string; price: number; resultTotalPrice: number }[]
  >([]);

  useEffect(() => {
    if (!product) return;

    const newResult = selectedOptions.map((option) => {
      const matchedOption = product.options?.find(
        (opt: { optName: string }) => opt.optName === option
      );

      const count = counts[option] || 1; //
      const price = matchedOption
        ? matchedOption.optOrgPrice + matchedOption.additionalPrice
        : product.finalPrice; //

      return {
        name: option,
        count: count,
        price: price,
        resultTotalPrice: count * price,
      };
    });

    setResult(newResult);
  }, [selectedOptions, counts, product]);

  console.log(result);

  //버튼 부분
  const handlePostData = () => {
    const res = fetch("localhost:30001/api/v1/orders");
  };

  return (
    <div>
      <h3>
        {result
          .reduce((sum, item) => sum + item.price * item.count, 0)
          .toLocaleString()}
        원
      </h3>
      <div className={cx("btn-wrap")}>
        <OneBtn
          color="--main-color"
          bgcolor="--white"
          border="--main-color"
          borderSize="1"
          title={<IoMdHeartEmpty />}
          width={"50"}
          height={"46"}
          fontSize={"18"}
        />
        <OneBtn
          color="--main-color"
          bgcolor="--white"
          border="--main-color"
          borderSize="1"
          title={<LuBell />}
          width={"50"}
          height={"46"}
        />
        <OneBtn
          // onClick={} 보류
          fontWeight="700"
          fontSize="19"
          title={"구매하기"}
          width={"343"}
          height={"46"}
        />
      </div>
    </div>
  );
};

export default ResultPart;
