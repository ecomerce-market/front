/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./popup.module.scss";
import cn from "classnames/bind";

interface PopupProps {
  // 팝업 문구
  title: string;
  // 왼쪽 버튼 문구
  leftBtn?: string;
  // leftBtn에 대한 링크
  leftBtnHref?: string;
  // 오른쪽 버튼 문구
  rightBtn: string;
  // rightbtn에 대한 링크
  rightBtnHref?: string;
  onClose?: () => void;
  onRightBtnClick?: (product: any) => void; // "확인" 버튼 클릭 시 실행할 함수
}

const cx = cn.bind(styles);

const Popup = (props: PopupProps) => {
  const { title, leftBtn, rightBtn, onClose, onRightBtnClick } = props;

  return (
    <div className={cx("popupWrapper")}>
      <div className={cx("titleWrapper")}>{title}</div>
      <div className={cx("confirmBtn")}>
        <span className={cx("leftBtn")} onClick={onClose}>
          {leftBtn}
        </span>
        <span className={cx("rightBtn")} onClick={onRightBtnClick}>
          {rightBtn}
        </span>
      </div>
    </div>
  );
};

export default Popup;
