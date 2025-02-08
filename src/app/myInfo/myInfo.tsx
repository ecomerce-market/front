"use client";
import React, { ChangeEvent, useState } from "react";
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

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch(
                "http://localhost:3001/api/v1/users/passwords",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ password }),
                }
            );

            if (response.status === 200) {
                console.log("Password verified successfully");
            } else if (response.status === 400) {
                setError("비밀번호가 일치하지 않습니다.");
            } else {
                setError("오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (err) {
            setError("서버 연결에 실패했습니다. 다시 시도해주세요.");
            console.error("Error verifying password:", err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx("myInfoWrapper")}>
            <PersonalInfo
                grade={"일반"}
                username={"김철수"}
                credit={"3,000"}
                expiringCredit={"50"}
                coupon={"4"}
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
                            <p>아이디</p>
                            <TextInput width={"280"} height={"30"} readOnly />
                        </div>
                        <div className={cx("submitInput")}>
                            <div className={cx("password")}>
                                <p>비밀번호</p>
                                <p className={cx("require")}>*</p>
                            </div>
                            <TextInput
                                width={"280"}
                                height={"30"}
                                placeholder={"비밀번호를 입력해주세요."}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {error && <p className={cx("errorMessage")}>{error}</p>}
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
