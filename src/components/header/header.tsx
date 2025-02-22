"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import cn from "classnames/bind";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoBasketSharp } from "react-icons/io5";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import TextInput from "../input/textInput";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const cx = cn.bind(styles);
const Header = () => {
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
  const [hamburger, setHamburger] = useState(false);

  // 로그아웃
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    if (confirm("로그아웃 하시겠습니까?")) {
      window.location.reload();
      router.push("/login");
    }
  };

  useEffect(() => {
    const UserToken = localStorage.getItem("token");
    const UserName = localStorage.getItem("userInfo");
    const cleanUserName = UserName ? JSON.parse(UserName) : null;

    setUserInfo({ token: UserToken, name: cleanUserName });
    setLoading(false);
  }, [pathname]);

  const onHamburger = () => {
    setHamburger(true);
  };

  useEffect(() => {
    if (!hamburger) return;

    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(`.${cx("hamburger-menu-list")}`);
      if (menu && !menu.contains(event.target as Node)) {
        setHamburger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburger]);
  return (
    <div className={cx("headerWrapper")}>
      <div className={cx("logo-header")}>
        <Image
          width={80}
          height={30}
          src={"/images/Logo2.png"}
          alt={"Logo"}
          className={cx("Logo2")}
        />
      </div>

      <div className={cx("userServices")}>
        {loading ? (
          <p className={cx("signup")}>열심히 일하는 중..</p>
        ) : (
          <>
            {userInfo.token ? (
              <Link href={"/mypage/myInfo"}>
                <p
                  style={{ color: "var(--main-color)" }}
                  className={cx("signup")}
                >
                  {userInfo.name}
                </p>
              </Link>
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

            <Link href={"/inquiry"}>
              <p className={cx("customerManagement")}>
                고객센터 <BiSolidDownArrow />
              </p>
            </Link>
          </>
        )}
      </div>

      <div className={cx("headerMain")}>
        <div className={cx("logo")}>
          <Image
            width={70}
            height={28}
            src={"/images/Logo1.png"}
            alt={"Logo"}
            className={cx("logo1")}
          />
          <Image
            width={80}
            height={30}
            src={"/images/Logo2.png"}
            alt={"Logo"}
            className={cx("Logo2")}
          />
        </div>

        <div className={cx("logo-mobile")}>
          <Image
            width={70}
            height={28}
            src={"/images/Logo1.png"}
            alt={"Logo"}
            className={cx("logo1")}
          />
        </div>

        <div className={cx("searchBar")}>
          <TextInput width={"350"} height={"42"} icon={<IoIosSearch />} />
        </div>

        <div className={cx("searchBar-medium")}>
          <TextInput width={"400"} height={"42"} icon={<IoIosSearch />} />
        </div>

        <div className={cx("searchBar-small")}>
          <TextInput width={"300"} height={"42"} icon={<IoIosSearch />} />
        </div>
        <div className={cx("searchBar-end-small")}>
          <TextInput width={"200"} height={"42"} icon={<IoIosSearch />} />
        </div>

        <div className={cx("subMenu")}>
          <Link href={"/wishList"}>
            <IoMdHeartEmpty />
          </Link>
          <Link href={"/cart"}>
            <IoBasketSharp />
          </Link>
        </div>

        <div onClick={onHamburger} className={cx("hamburger-menu")}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* 햄버거 메뉴 오버레이 */}
      {hamburger && (
        <div className={cx("hamburger-overlay")}>
          <div
            className={cx("hamburger-menu-list")}
            onClick={(e) => e.stopPropagation()}
          >
            {userInfo.token ? (
              <Link href={"/mypage/myInfo"}>
                <p
                  style={{ color: "var(--main-color)" }}
                  className={cx("signup")}
                >
                  {userInfo.name}
                </p>
              </Link>
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

            <Link href={"/inquiry"}>
              <p className={cx("customerManagement")}>
                고객센터 <BiSolidDownArrow />
              </p>
            </Link>

            {userInfo.token ? (
              <Link href={"/login"}>
                <p className={cx("login")}>찜</p>
              </Link>
            ) : null}

            {userInfo.token ? (
              <Link href={"/login"}>
                <p className={cx("login")}>장바구니</p>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
