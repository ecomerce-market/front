import cn from "classnames/bind";
import styles from "./detailListInfo.module.scss";
import React from "react";

const cx = cn.bind(styles);

type DetailListInfoProps = {
  infoTitle: string;
  infoDetail?: string;
  subDetail?: string;
  showSelect?: boolean;
  showInfo?: boolean;
  selectOptions?: string[];
};

const DetailListInfo = ({
  infoTitle,
  infoDetail,
  subDetail,
  showSelect = false,
  showInfo = true,
  selectOptions = [],
}: DetailListInfoProps) => {
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
        <div className={cx("list-info-wrapper")}>
          <div className={cx("infomation")}>
            <p>{infoTitle}</p>
          </div>
          <div className={cx("infomation-detail")}>
            <select className={cx("info-select")}>
              <option> 상품을 선택해주세요</option>
              <option>{selectOptions}</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailListInfo;
