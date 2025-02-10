import React from "react";
import styles from "./reviewPopup.module.scss";
import cn from "classnames/bind";
import { FiXCircle } from "react-icons/fi";
import { FaCamera } from "react-icons/fa6";
import TwoBtn from "../btn/twoBtn";
import Image from "next/image";

const cx = cn.bind(styles);

const reviewPopup = () => {
    return (
        <div className={cx("reviewPopupWrapper")}>
            <div className={cx("reviewPopupLogo")}>
                <Image
                    width={157}
                    height={202}
                    src="/images/Logo1.png"
                    alt=""
                    className={cx("reviewPopupHeader")}
                />
                <div className={cx("end")}>
                    <FiXCircle />
                </div>
            </div>

            <div className={cx("reviewPopupBody")}>
                <div className={cx("bodyContent")}>
                    <h1 className={cx("bodyTitle")}>후기 작성하기</h1>
                    <Image
                        width={102}
                        height={131}
                        src="/images/example.png"
                        alt=""
                        className={cx("bodyImg")}
                    />
                    <h2 className={cx("productTitle")}>감자 2kg</h2>
                </div>
                <div className={cx("reviewWriteArea")}>
                    <textarea
                        placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요."
                        id=""
                        className={cx("writeReview")}
                    ></textarea>
                    <div className={cx("photoUpload")}>
                        <FaCamera />
                        <p>사진 첨부하기</p>
                    </div>
                </div>
                <TwoBtn
                    leftTitle={"취소"}
                    rightTitle={"등록하기"}
                    leftBgColor={"--white"}
                    rightBgColor={"--main-color"}
                    leftBorder={"--black-100"}
                    rightBorder={"--main-color"}
                />
            </div>
        </div>
    );
};

export default reviewPopup;
