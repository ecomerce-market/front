import cn from "classnames/bind";
import styles from "./detailListInfo.module.scss";
import React from "react";

const cx = cn.bind(styles);

type DetailListInfo = {
  infoTitle: string;
  infoDetail: string;
  subDetail?: string;
};

const DetailListInfo = ({
  infoTitle,
  infoDetail,
  subDetail,
}: DetailListInfo) => {
  return (
    <div>
      <div className={cx("infomation")}>
        <p>{infoTitle}</p>
      </div>
      <div className={cx("infomation-detail")}>
        <p>{infoDetail}</p>
        <p className={cx("subDetail")}>{subDetail}</p>
      </div>
    </div>
  );
};

export default DetailListInfo;
