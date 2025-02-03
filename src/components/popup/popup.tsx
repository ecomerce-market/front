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
    rightBtnHref: string;
}

const cx = cn.bind(styles);

const Popup = (props: PopupProps) => {
    const { title, leftBtn, leftBtnHref, rightBtn, rightBtnHref } = props;

    return (
        <div className={cx("popupWrapper")}>
            <div className={cx("titleWrapper")}>{title}</div>
            <div className={cx("confirmBtn")}>
                {leftBtn && leftBtnHref && (
                    <a href={leftBtnHref} className={cx("leftBtn")}>
                        {leftBtn}
                    </a>
                )}
                <a href={rightBtnHref} className={cx("rightBtn")}>
                    {rightBtn}
                </a>
            </div>
        </div>
    );
};

export default Popup;
