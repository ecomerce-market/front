"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import cn from "classnames/bind";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoBasketSharp } from "react-icons/io5";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import TextInput from "../input/textInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const cx = cn.bind(styles);
const header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    token: string | null;
    name: string | null;
  }>({
    token: null,
    name: null,
  });
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // 로그아웃
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    confirm("로그아웃 하시겠습니까?");
    window.location.reload();
    router.push("/login");
  };

  useEffect(() => {
    const UserToken = localStorage.getItem("token");
    const UserName = localStorage.getItem("userInfo");

    const cleanUserName = UserName ? JSON.parse(UserName) : null;
    setUserInfo({
      token: UserToken,
      name: cleanUserName,
    });
    setLoading(false);

    console.log(UserToken, UserName);
  }, [pathname]);

  return (
    <div className={cx("headerWrapper")}>
      <div className={cx("userServices")}>
        {loading ? (
          <p className={cx("signup")}>열심히 일하는 중..</p> // Show loading message while loading
        ) : (
          <>
            {userInfo.token ? (
              <p
                style={{ color: "var(--main-color)" }}
                className={cx("signup")}
              >
                {userInfo.name}
              </p>
            ) : (
              <Link href={"/signUp"}>
                <p className={cx("signup")}>회원가입</p>
              </Link>
            )}

            {userInfo.token ? (
              <p
                style={{ color: "var(--main-color)" }}
                className={cx("signup")}
                onClick={handleLogOut}
              >
                로그아웃
              </p>
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
          </>
        )}
      </div>
      <div className={cx("headerMain")}>
        <div className={cx("logo")}>
          <img src="/images/Logo1.png" alt="" className={cx("logo1")} />
          <img src="/images/Logo2.png" alt="" className={cx("logo2")} />
        </div>
        <div className={cx("searchBar")}>
          <TextInput width={"290"} height={"30"} icon={<IoIosSearch />} />
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
