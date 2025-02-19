"use client";

import cn from "classnames/bind";
import styles from "./ProductInfoList.module.scss";
import React, { useState } from "react";

const cx = cn.bind(styles);
type ProductInfoListProps = {
  detailInfoHtml: string;
  likeCnt: number;
};

const productInfoList = ({ detailInfoHtml, likeCnt }: ProductInfoListProps) => {
  const [selected, setSelected] = useState<number | null>(0);

  // 각 탭에 대한 내용
  const items = [
    { label: "상품설명", index: 0, content: detailInfoHtml },
    { label: "상품정보", index: 1, content: detailInfoHtml },
    {
      label: `후기(${likeCnt})`,
      index: 2,
      content: <span>3차 개발</span>,
    },
    { label: "문의", index: 3, content: detailInfoHtml },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={cx("list-bar")}>
      {/* 탭 목록 */}
      <div className={cx("tab-list")}>
        {items.map(({ label, index }) => (
          <p
            key={index}
            className={cx({ selected: selected === index })}
            onClick={() => handleSelect(index)}
          >
            {label}
          </p>
        ))}
      </div>

      {/* 선택된 항목에 맞는 내용 */}
      <div className={cx("tab-content")}>
        {selected !== null && items[selected].content}
      </div>
    </div>
  );
};

export default productInfoList;
