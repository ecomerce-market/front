import React from "react";
import styles from "./myInfo.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";

const cx = cn.bind(styles);

interface MyInfoProps {
    userId: string;
    password: string;
    error: string;
    isLoading: boolean;
    isPasswordCorrect: boolean;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const MyInfo = ({
    userId,
    password,
    error,
    isLoading,
    isPasswordCorrect,
    onPasswordChange,
    onSubmit,
}: MyInfoProps) => {
    return (
        <div className={cx("myInfoWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/mypage/myInfo" },
                            { label: "주문내역", path: "/mypage/orderList" },
                            { label: "찜한상품", path: "/mypage/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/mypage/addressManagement",
                            },
                            { label: "상품 후기", path: "/mypage/review" },
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
                                    onChange={onPasswordChange}
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
                                onClick={onSubmit}
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
