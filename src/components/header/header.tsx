import React from "react";
import styles from "./header.module.scss";
import cn from "classnames/bind";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoBasketSharp } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import TextInput from "../input/textInput";

const cx = cn.bind(styles);
const header = () => {
    return (
        <div className={cx("headerWrapper")}>
            <div className={cx("userServices")}>
                <p className={cx("signup")}>회원가입</p>
                <p className={cx("login")}>로그인</p>
                <p className={cx("customerManagement")}>
                    고객센터 <BiSolidDownArrow />
                </p>
            </div>
            <div className={cx("headerMain")}>
                <div className={cx("logo")}>
                    <img
                        src="/images/Logo1.png"
                        alt=""
                        className={cx("logo1")}
                    />
                    <img
                        src="/images/Logo2.png"
                        alt=""
                        className={cx("logo2")}
                    />
                </div>
                <div className={cx("searchBar")}>
                    <TextInput />
                </div>
                <div className={cx("subMenu")}>
                    <IoMdHeartEmpty />
                    <IoBasketSharp />
                </div>
            </div>
        </div>
    );
};

export default header;
