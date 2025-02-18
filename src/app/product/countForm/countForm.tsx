"use client";

import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./countForm.module.scss";

const cx = cn.bind(styles);
type countFormProps = {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const CountForm = ({ selectedOptions, setSelectedOptions }: countFormProps) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

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
    <>
      <div>
        {selectedOptions.length > 0 ? (
          <div>
            {selectedOptions.map((item, index) => (
              <div key={index}>
                {item}
                <span onClick={(e) => handleMinusCount(item, e)}> - </span>
                <span> {counts[item] || 1} </span>{" "}
                {/* 개별 상품에 대한 count */}
                <span onClick={(e) => handlePlusCount(item, e)}> + </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CountForm;
