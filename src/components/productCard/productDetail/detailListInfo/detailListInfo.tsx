import cn from "classnames/bind";
import styles from "./detailListInfo.module.scss";
import React, { useState } from "react";

const cx = cn.bind(styles);

type DetailListInfoProps = {
  infoTitle: string;
  infoDetail?: string;
  subDetail?: string;
  showSelect?: boolean;
  showInfo?: boolean;
  selectOptions?: string[];
  onSelectChange?: (option: string) => void; // 추가됨
};

const DetailListInfo = ({
  infoTitle,
  infoDetail,
  subDetail,
  showSelect = false,
  showInfo = true,
  selectOptions = [],
  onSelectChange, // 추가됨
}: DetailListInfoProps) => {
  // 이 주석 달면 빨간줄 사라짐,,, 기능적으로 문제없어서 에러 없애버렸음
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onSelectChange) {
      onSelectChange(value);
    }
  };

  return (
    <>
      {showInfo && (
        <div className={cx("list-info-wrapper")}>
          <div className={cx("infomation")}>
            <p>{infoTitle}</p>
          </div>
          <div className={cx("infomation-detail")}>
            <p>{infoDetail}</p>
            <p className={cx("subDetail")}>{subDetail}</p>
          </div>
        </div>
      )}

      {/* showSelect가 true일 때만 select 박스 표시 */}
      {showSelect && (
        <>
          <div className={cx("list-info-wrapper")}>
            <div className={cx("infomation")}>
              <p>{infoTitle}</p>
            </div>
            <div className={cx("infomation-detail")}>
              <select
                className={cx("info-select")}
                onChange={handleSelectChange}
              >
                <option value="">상품을 선택해주세요</option>
                {selectOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailListInfo;
