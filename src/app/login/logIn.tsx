"use client";

import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFoundPage from "../not-found";
import Loading from "@/components/loading/loading";

const cx = cn.bind(styles);

type LoginFormDataType = {
  loginId: string;
  loginPw: string;
};

const LogIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState<LoginFormDataType>({
    loginId: "",
    loginPw: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        validateToken(savedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const validateToken = async (accessToken: string) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/validate",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setToken(accessToken);
      } else {
        refreshAccessToken();
      }
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      refreshAccessToken();
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setToken(null);
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/v1/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      const responseData = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", responseData.accessToken);
        setToken(responseData.accessToken);
      } else {
        setToken(null);
      }
    } catch (error) {
      console.error("리프레시 토큰 실패:", error);
      setToken(null);
    }
  };

  const loginApi = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/users/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const responseData = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", responseData.accessToken);
        localStorage.setItem("refreshToken", responseData.refreshToken);
        localStorage.setItem("userInfo", JSON.stringify(responseData.name));
        router.push("/");
      } else {
        alert(responseData.message || "로그인 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와의 연결에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginApi();
  };

  return (
    <>
      {token ? (
        <NotFoundPage />
      ) : (
        <div className={cx("loginContainer")}>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className={cx("inputWrapper")}>
              <TextInput
                height="46"
                width="332"
                placeholder="아이디를 입력해주세요"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
              />

              <TextInput
                height="46"
                width="332"
                placeholder="비밀번호를 입력해주세요"
                name="loginPw"
                value={form.loginPw}
                onChange={handleChange}
                type="password"
              />
            </div>

            <div className={cx("btnWrapper")}>
              <OneBtn
                color="--white"
                bgcolor="--main-color"
                title="로그인"
                width="350"
                height="46"
                onClick={loginApi} // 버튼 클릭 시 로그인 실행
              />
              <Link href={"/signUp"}>
                <OneBtn
                  color="--main-color"
                  bgcolor="--white"
                  title="회원가입"
                  width="350"
                  height="46"
                  border="--main-color"
                  borderSize="1"
                />
              </Link>
            </div>
          </form>

          <div className={cx("sidebar")}>
            <Link href={"/findId"}>아이디 찾기</Link>
            <span>l</span>
            <Link href={"/findPw"}>비밀번호 찾기</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
