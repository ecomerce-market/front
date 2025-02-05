import React from "react";
import styles from "./inquiry.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

const notice = () => {
    return (
        <div className={cx("inquiryWrapper")}>
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
                        content={["1:1 문의", "공지사항", "자주하는 질문"]}
                    />
                </div>
                <div className={cx("inquirySection")}>
                    <div className={cx("inquiryHeader")}>
                        <h1 className={cx("mainTitle")}>1:1 문의</h1>
                        <div className={cx("inquiryTitle")}>
                            <p>제목</p>
                            <div>
                                <p>작성일</p>
                                <p>답변상태</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("inquiryList")}>
                        <p>교환하고 싶어요</p>
                        <div>
                            <p>2025/02.05</p>
                            <p>답변대기</p>
                        </div>
                    </div>{" "}
                    <div className={cx("inquiryBtn")}>
                        <OneBtn
                            title={"문의하기"}
                            width={"96"}
                            height={"35"}
                            bgcolor={"--main-color"}
                            color={"--white"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default notice;
