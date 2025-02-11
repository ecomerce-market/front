"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import styles from "./myInfo.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";

const cx = cn.bind(styles);

const MyInfo = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); //

    //사용자 정보 API 연결
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("로그인이 필요합니다.");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:3001/api/v1/users/profiles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200 && response.data.data?.loginId) {
                    setUserId(response.data.data.loginId);
                } else {
                    setError("사용자 정보를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error(error);
                setError("서버 요청 실패");
            }
        };

        fetchUserInfo();
    }, []);

    // 비밀번호 입력 값 변경 시 상태 업데이트
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    // 비밀번호 확인 API 연결
    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("로그인이 필요합니다.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3001/api/v1/users/passwords",
                { loginPw: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsPasswordCorrect(true);
            } else {
                setError("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status === 400) {
                    setError("비밀번호가 일치하지 않습니다.");
                } else if (error.response.status === 401) {
                    setError("인증이 실패했습니다. 다시 로그인 해주세요.");
                } else {
                    setError("서버 연결에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx("myInfoWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/myInfo" },
                            { label: "주문내역", path: "/orderList" },
                            { label: "찜한상품", path: "/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/addressManagement",
                            },
                            { label: "상품 후기", path: "/review" },
                        ]}
                    />
                </div>
                <div className={cx("checkInfo")}>
                    <h1 className={cx("mainTitle")}>개인 정보 수정</h1>
                    <div>
                        <h2 className={cx("subTitle")}>비밀번호 재확인</h2>
                        <p className={cx("description")}>
                            회원님의 정보를 안전하게 보호하기 위해 비밀번호를
                            다시 한번 확인해주세요.
                        </p>
                    </div>
                    <div className={cx("submitForm")}>
                        <div className={cx("submitInput")}>
                            <span>아이디</span>
                            <div>
                                <TextInput
                                    width={"280"}
                                    height={"42"}
                                    value={userId}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={cx("submitInput")}>
                            <div className={cx("password")}>
                                <span>비밀번호</span>
                                <span className={cx("require")}>*</span>
                            </div>
                            <div>
                                <TextInput
                                    width={"280"}
                                    height={"42"}
                                    type="password"
                                    placeholder={"비밀번호를 입력해주세요."}
                                    onChange={handlePasswordChange}
                                />
                                {error && (
                                    <span className={cx("errorMessage")}>
                                        {error}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx("submitBtn")}>
                        {isPasswordCorrect ? (
                            <Link href="/myInfo/myInfoDetail">
                                <OneBtn
                                    title={"확인"}
                                    width={"320"}
                                    height={"46"}
                                    bgcolor={"--main-color"}
                                    color={"--white"}
                                    disabled={isLoading}
                                />
                            </Link>
                        ) : (
                            <OneBtn
                                title={"확인"}
                                width={"320"}
                                height={"46"}
                                bgcolor={"--main-color"}
                                color={"--white"}
                                onClick={handleSubmit}
                                disabled={isLoading}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
