import cn from "classnames/bind";
import styles from "./detailListInfo.module.scss";
import React from "react";
import { ProductInfo } from "@/app/@types/product";

type InfoProps = {
  data: ProductInfo;
};
const cx = cn.bind(styles);

const DetailListInfo = ({ data }: InfoProps) => {
  return (
    <>
      <div className={cx("list-info-wrapper")}>
        {data.extraDescription ? (
          <p className={cx("extra")}>{data.extraDescription}</p>
        ) : null}
        <div className={cx("infomation")}>
          <span className={cx("infomation-type")}>배송</span>
          <div className={cx("infomation-detail")}>
            {data.deliveryComp}
            {data.deliveryInfo ? (
              <p className={cx("infomation-sub")}>{data.deliveryInfo}</p>
            ) : null}
          </div>
        </div>

        <div className={cx("infomation")}>
          <span className={cx("infomation-type")}>판매자</span>{" "}
          <div className={cx("infomation-detail")}>{data.seller}</div>
        </div>

        <div className={cx("infomation")}>
          <span className={cx("infomation-type")}>포장타입</span>
          <div className={cx("infomation-detail")}>
            {data.packageType}
            {data.packageDescription ? (
              <p className={cx("infomation-sub")}>{data.packageDescription}</p>
            ) : null}
          </div>
        </div>

        <div className={cx("infomation")}>
          <span className={cx("infomation-type")}>원산지</span>
          <div className={cx("infomation-detail")}>{data.productOrigin}</div>
        </div>
      </div>
    </>
  );
};

export default DetailListInfo;
