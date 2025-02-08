"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import styles from "./myInfo.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

const MyInfo = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        grade: "",
        username: "",
        credit: "",
        expiringCredit: "",
        coupon: "",
    });

    // 사용자 프로필 정보 조회 API (이름, 등급, 적립금, 소멸예정 적립금, 쿠폰)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get(
                    "http://localhost:3001/api/v1/users/profiles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setUserInfo({
                        grade: response.data.grade,
                        username: response.data.username,
                        credit: response.data.credit.toLocaleString(),
                        expiringCredit:
                            response.data.expiringCredit.toLocaleString(),
                        coupon: response.data.coupon.toString(),
                    });
                }
            } catch (err) {
                console.error("Failed to fetch user info:", err);
            }
        };
        fetchUserInfo();
    }, []);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    // 비밀번호 일치 여부 확인 API
    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("jwt");

            const response = await axios.post(
                "http://localhost:3001/api/v1/users/passwords",
                { password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // 로그인 API 연결되면 테스트 후 아래 문구들 수정 예정
            if (response.status === 200) {
                console.log("비밀번호가 일치합니다.");
            } else {
                setError("오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    setError("비밀번호가 일치하지 않습니다.");
                } else {
                    setError("서버 연결에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className={cx("myInfoWrapper")}>
            <PersonalInfo
                grade={userInfo.grade}
                username={userInfo.username}
                credit={userInfo.credit}
                expiringCredit={userInfo.expiringCredit}
                coupon={userInfo.coupon}
            />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
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
                                {" "}
                                <TextInput
                                    width={"280"}
                                    height={"42"}
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
                        <OneBtn
                            title={"확인"}
                            width={"320"}
                            height={"46"}
                            bgcolor={"--main-color"}
                            color={"--white"}
                            onClick={handleSubmit}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
