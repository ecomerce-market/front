import React from "react";
import styles from "./addressManagement.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Radio from "@/components/radio/radio";

const cx = cn.bind(styles);

const addressManagement = () => {
    return (
        <div className={cx("addressManagementWrapper")}>
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
                <div className={cx("addressSection")}>
                    <div className={cx("addressHeader")}>
                        <h1 className={cx("mainTitle")}>배송지 관리</h1>
                        <p className={cx("subTitle")}>
                            배송지에 따라 상품정보 및 배송유형이 달라질 수
                            있습니다.
                        </p>
                        <p className={cx("content")}>+ 새 배송지 추가</p>
                    </div>

                    <div className={cx("submitForm")}>
                        <p className={cx("mainAddress")}>기본 배송지</p>
                        <Radio
                            title={
                                "울산 동구 동해안로 1427 ~아파트 100동 101호"
                            }
                            name={"주소"}
                            value={"address"}
                        />
                        <Radio
                            title={
                                "울산 동구 동해안로 1427 ~아파트 100동 101호"
                            }
                            name={"주소"}
                            value={"address"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default addressManagement;
