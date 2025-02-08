"use client";
import React, { useState, useEffect } from "react";
import styles from "./header.module.scss";
import cn from "classnames/bind";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoBasketSharp } from "react-icons/io5";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import TextInput from "../input/textInput";
import Link from "next/link";
import Image from "next/image";

const cx = cn.bind(styles);

const Header = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);

    return (
        <div className={cx("headerWrapper")}>
            <div className={cx("userServices")}>
                <Link href={"/signUp"}>
                    <p className={cx("signup")}>회원가입</p>
                </Link>
                {username ? (
                    <p className={cx("login")}>{username}</p>
                ) : (
                    <Link href={"/login"}>
                        <p className={cx("login")}>로그인</p>
                    </Link>
                )}
                <Link href={"/"}>
                    <p className={cx("customerManagement")}>
                        고객센터 <BiSolidDownArrow />
                    </p>
                </Link>
            </div>
            <div className={cx("headerMain")}>
                <div className={cx("logo")}>
                    <Image
                        width={59}
                        height={26}
                        src="/images/Logo1.png"
                        alt=""
                        className={cx("logo1")}
                    />
                    <Image
                        width={47}
                        height={17}
                        src="/images/Logo2.png"
                        alt=""
                        className={cx("logo2")}
                    />
                </div>
                <div className={cx("searchBar")}>
                    <TextInput
                        width={"290"}
                        height={"40"}
                        icon={<IoIosSearch />}
                    />
                </div>
                <div className={cx("subMenu")}>
                    <Link href={"/wishList"}>
                        <IoMdHeartEmpty />
                    </Link>
                    <Link href={"/cart"}>
                        <IoBasketSharp />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;

//로그인 시 회원 이름으로 변경되는 기능
//고객센터, 회원 선택 시 팝업 나오게 기능 추가 (각 화면으로 이동하게)
//고객센터 1:1 문의 선택
//1. 로그인 한 상태에서는 해당 페이지로
//2. 로그인 안 한 상태에서는 팝업

//장바구니 및 찜 기능 로그인 했을 시에만 접근 가능
//(로그인 안 된 상태인 경우 팝업)
