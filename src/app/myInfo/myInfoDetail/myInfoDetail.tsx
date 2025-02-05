import React from "react";
import styles from "./myInfoDetail.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TwoBtn from "@/components/btn/twoBtn";

const cx = cn.bind(styles);

const myInfoDetail = () => {
    const inputSize = { width: "280", height: "30" };

    return (
        <div className={cx("myInfoDetailWrapper")}>
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
                            "주문내역",
                            "찜한상품",
                            "배송지 관리",
                            "상품 후기",
                            "결제수단",
                        ]}
                    />
                </div>
                <div className={cx("checkInfo")}>
                    <h1 className={cx("mainTitle")}>개인 정보 수정</h1>
                    <div className={cx("submitForm")}>
                        <div>
                            <p>아이디</p>
                            <TextInput {...inputSize} />
                        </div>
                        <div>
                            <p>현재 비밀번호</p>
                            <TextInput {...inputSize} />
                        </div>
                        <p>
                            <p>새 비밀번호</p>
                            <TextInput {...inputSize} />
                        </p>
                        <div>
                            <p>새 비밀번호 확인</p>
                            <TextInput {...inputSize} />
                        </div>
                        <div>
                            <p>이름</p>
                            <TextInput {...inputSize} />
                        </div>
                        <div>
                            <p>이메일</p>
                            <TextInput {...inputSize} />
                        </div>
                        <div>
                            <p>휴대폰</p>
                            <TextInput {...inputSize} />
                        </div>
                        <div>
                            <p>생년월일</p>
                            <TextInput {...inputSize} />
                        </div>
                    </div>
                    <div className={cx("submitBtn")}>
                        <TwoBtn
                            leftTitle={"탈퇴하기"}
                            rightTitle={"회원정보 수정"}
                            leftBgColor={"--white"}
                            rightBgColor={"--main-color"}
                            leftBorder={"--black-100"}
                            rightBorder={"--main-color"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myInfoDetail;
