import React from "react";
import styles from "./inquiryDetail.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OneBtn from "@/components/btn/oneBtn";
import TextInput from "@/components/input/textInput";
import { FaCamera } from "react-icons/fa6";

const cx = cn.bind(styles);

const notice = () => {
    return (
        <div className={cx("inquiryDetailWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "1:1 문의", path: "/inquiry" },
                            { label: "공지사항", path: "/notice" },
                            { label: "자주하는 질문", path: "/faq" },
                        ]}
                    />
                </div>
                <div className={cx("inquiryDetailSection")}>
                    <div className={cx("inquiryDetailHeader")}>
                        <h1 className={cx("mainTitle")}>1:1 문의</h1>
                    </div>
                    <div className={cx("inquiryTitle")}>
                        <div className={cx("type")}>
                            <div className={cx("subTitle")}>
                                <p>유형</p>
                                <p className={cx("require")}>*</p>
                            </div>
                            <select
                                name="category"
                                id="category"
                                className={cx("selectCategory")}
                            >
                                <option value="default" disabled selected>
                                    문의 유형을 선택해주세요
                                </option>
                                <option value="exchange-refund">
                                    교환/환불
                                </option>
                                <option value="shipping">배송</option>
                                <option value="exchange-refund2">
                                    교환/환불
                                </option>
                            </select>
                        </div>
                        <div className={cx("content")}>
                            <div className={cx("subTitle")}>
                                <p>제목</p>
                                <p className={cx("require")}>*</p>
                            </div>
                            <TextInput placeholder={"제목을 입력해주세요"} />
                        </div>
                        <div className={cx("detail")}>
                            <div className={cx("subTitle")}>
                                <p>내용</p>
                                <p className={cx("require")}>*</p>
                            </div>
                            <textarea
                                placeholder="1:1 문의 작성 전 확인해주세요!
                                            ※ 전화번호, 이메일, 주소, 계좌번호 등의 상세 개인정보가 문의 내용에 저장되지 않도록 주의해 주시기 바랍니다.
                                            주문취소
                                            [주문완료] 상태일 경우에만 주문 취소 가능합니다.
                                            주문상품의 부분취소는 불가능합니다. 전체 주문 취소 후 다시 구매해주세요.
                                            배송
                                            배송일 및 배송시간 지정은 불가능합니다.
                                            주문 이후 주소지, 결제수단 변경 등 정보수정 불가능합니다."
                                id=""
                                className={cx("writeReview")}
                            ></textarea>
                        </div>
                        <div>
                            <div>
                                <FaCamera />
                            </div>

                            <div>
                                <p>30MB 이하의 이미지만 업로드 가능합니다.</p>
                                <p>
                                    상품과 무관한 내용이거나 음란 및 불법적인
                                    내용은 통보없이 삭제 될 수 있습니다.
                                </p>
                                <p>사진은 최대 8장까지만 등록 가능합니다.</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx("inquiryBtn")}>
                        <OneBtn
                            title={"등록"}
                            width={"77"}
                            height={"26"}
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
