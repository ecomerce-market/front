"use client";

import React, { useEffect, useState } from "react";
import styles from "./login.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFoundPage from "../not-found";

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
        // 클라이언트 사이드에서만 localStorage에 접근 가능 중요!
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            setToken(savedToken);
            setLoading(false);
        }
    }, []);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("로그인 정보:", form);
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
                    console.log("응답데이터", responseData);
                    localStorage.setItem("token", responseData.accessToken);
                    localStorage.setItem(
                        "refreshToken",
                        responseData.refreshToken
                    );
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(responseData.name)
                    );
                    alert("로그인 성공");
                    router.push("/");
                } else if (responseData.code === "E000") {
                    alert("잘못된 정보입니다.");
                } else if (responseData.code === "E002") {
                    alert("사용자를 찾을 수 없습니다.");
                } else if (responseData.code === "E003") {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            } catch (error) {
                console.error("에러 발생:", error);
                alert(
                    "서버와의 연결에 실패했습니다. 나중에 다시 시도해주세요."
                );
            }
        };

        loginApi();
    };

    if (loading) {
        return (
            <div>
                {" "}
                <NotFoundPage />
            </div>
        );
    }

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
