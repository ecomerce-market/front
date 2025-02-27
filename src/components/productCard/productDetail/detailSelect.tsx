"use client";

import cn from "classnames/bind";
import styles from "./detailSelect.module.scss";
import React, { useState } from "react";
import CountForm from "@/components/productCard/productDetail/detailListInfo/countForm/countForm";
const cx = cn.bind(styles);

type selectProps = {
  data: selectProduct[];
  productName: string;
  id: string;
};

type selectProduct = {
  optName: string;
  optOrgPrice: string;
  additionalPrice: string;
  optAmount: string;
  _id: string;
};

const DetailSelect = ({ data, productName, id }: selectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectIsOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue !== "0" && !selectedOptions.includes(selectedValue)) {
      setSelectedOptions((prev) => [...prev, selectedValue]);
    }
  };

  return (
    <div className={cx("list-info-wrapper")}>
      <div className={cx("infomation")}>
        <span className={cx("infomation-type")}>상품</span>{" "}
        <div className={cx("infomation-detail")}>
          {data.length > 0 ? (
            <div className={cx("select-box")}>
              <select
                className={cx("select")}
                defaultValue={"0"}
                onChange={handleSelectIsOption}
              >
                <option value={"0"}>상품을 선택하세요 </option>
                {data.map((items) => (
                  <option key={items._id} value={items.optName}>
                    {items.optName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className={cx("select-box")}>
              <select
                className={cx("select")}
                defaultValue={"0"}
                onChange={handleSelectIsOption}
              >
                <option value={"0"}>상품을 선택하세요 </option>
                <option value={productName}>{productName}</option>
              </select>
            </div>
          )}
        </div>
      </div>
      {/* 카운트 영역 */}
      {/* state로 담아오면 되겠지?? oh my god 좀 되라라*/}
      {/* 근데 코드 더러워 지니깐 컴포넌트로 이것도 빼보자  */}
      <CountForm
        id={id}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
      />
    </div>
  );
};

export default DetailSelect;
