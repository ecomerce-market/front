import React, { useState, useEffect } from "react";
import cn from "classnames/bind";
import styles from "./countForm.module.scss";

const cx = cn.bind(styles);

type CountFormProps = {
  selectedProduct: string | null;
  discountPrice?: string;
  originPrice: string;
};

const CountForm = ({
  selectedProduct,
  originPrice,
  discountPrice,
}: CountFormProps) => {
  const [count, setCount] = useState<number>(1);
  let unitPrice: string; // 변수 선언

  if (discountPrice) {
    unitPrice = discountPrice;
  } else {
    unitPrice = originPrice;
  }

  useEffect(() => {
    setCount(1);
  }, [selectedProduct]);

  const handleMinusCount = () => {
    if (count === 1) {
      setCount(0);
    } else {
      setCount((prev) => prev - 1);
    }
  };

  const handlePlusCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className={cx("countForm-wrapper")}>
      {selectedProduct && count > 0 && (
        <div className={cx("pick-product")}>
          <span>{selectedProduct}</span>
          <div className={cx("count-info")}>
            <div className={cx("count")}>
              <span onClick={handleMinusCount} className={cx("minus")}>
                -
              </span>
              <span className={cx("pick-count")}>{count}개</span>
              <span onClick={handlePlusCount} className={cx("plus")}>
                +
              </span>
            </div>
            <span className={cx("price")}>{unitPrice.toLocaleString()}원</span>
          </div>
        </div>
      )}

      {selectedProduct && count > 0 && (
        <div className={cx("total-wrap")}>
          <span className={cx("total-price")}>총 상품금액 :</span>
          <span className={cx("result-price")}>
            {(count * parseInt(unitPrice)).toLocaleString()}원
          </span>
        </div>
      )}
    </div>
  );
};

export default CountForm;
