"use client";
import React, { useState, useEffect } from "react";
import styles from "./myInfo.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";
import { authService, ERROR_MESSAGES } from "./myInfoService";

const cx = cn.bind(styles);

const MyInfo = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await authService.getUserProfile();
                setUserId(userData.loginId);
            } catch (error: any) {
                if (
                    error.message === ERROR_MESSAGES.TOKEN_MISSING ||
                    error.message === ERROR_MESSAGES.E009
                ) {
                    localStorage.removeItem("token");
                    router.push("/login");
                } else {
                    router.push("/not-found");
                }
            }
        };

        fetchUserProfile();
    }, [router]);

    // 비밀번호 저장
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    // 비밀번호 검증
    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const result = await authService.verifyPassword(password);

            if (result.success) {
                setIsPasswordCorrect(true);
            } else {
                setError(result.message || "비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            setError("오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx("myInfoWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu title={"마이컬리"} />
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
                            <Link href="/mypage/myInfo/myInfoDetail">
                                <OneBtn
                                    title={"확인"}
                                    height={"46"}
                                    bgcolor={"--main-color"}
                                    color={"--white"}
                                    disabled={isLoading}
                                />
                            </Link>
                        ) : (
                            <OneBtn
                                title={"확인"}
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
