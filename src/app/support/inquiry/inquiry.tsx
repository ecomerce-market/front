"use client";
import React, { useState } from "react";
import styles from "./inquiry.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);
// const inquiryData = [
//     {
//         id: 1,
//         title: "문의사항",
//         date: "2025.02.10",
//         answerState: "답변대기",
//         content:
//             "안녕하세요. 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. 더 자세한 내용은 여기에 작성됩니다.",
//     },
//     {
//         id: 2,
//         title: "문의사항",
//         date: "2025.02.10",
//         answerState: "답변완료",
//         content:
//             "안녕하세요. 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. 더 자세한 내용은 여기에 작성됩니다.",
//         answer: "답변 드립니다. 확인 후 추가 문의사항이 있으시다면 다시 문의해주세요.",
//     },
// ];
const Inquiry = () => {
    const [openInquiryIds, setOpenInquiryIds] = useState([]);
    const inquiryData = [];

    const handleInquiryClick = (id) => {
        setOpenInquiryIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((openId) => openId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div className={cx("inquiryWrapper")}>
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
                    <div className={cx("inquiryListContainer")}>
                        {inquiryData.length === 0 ? (
                            <p className={cx("noInquiries")}>
                                게시물이 없습니다.
                            </p>
                        ) : (
                            inquiryData.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className={cx("inquiryItem")}
                                >
                                    <div
                                        className={cx("inquiryList")}
                                        onClick={() =>
                                            handleInquiryClick(inquiry.id)
                                        }
                                    >
                                        <div className={cx("dateAndIcon")}>
                                            <span>{inquiry.title}</span>
                                        </div>
                                        <div className={cx("inquiryInfo")}>
                                            <p>{inquiry.date}</p>
                                            <p
                                                className={cx(
                                                    "answerState",
                                                    inquiry.answerState ===
                                                        "답변완료"
                                                        ? "completed"
                                                        : "waiting"
                                                )}
                                            >
                                                {inquiry.answerState}
                                            </p>
                                        </div>
                                    </div>
                                    {openInquiryIds.includes(inquiry.id) && (
                                        <div
                                            className={cx(
                                                "inquiryContent",
                                                "question"
                                            )}
                                        >
                                            <p>Q. {inquiry.content}</p>
                                        </div>
                                    )}
                                    {openInquiryIds.includes(inquiry.id) &&
                                        inquiry.answerState === "답변완료" && (
                                            <div
                                                className={cx(
                                                    "inquiryContent",
                                                    "answer"
                                                )}
                                            >
                                                <p>A. {inquiry.answer}</p>
                                            </div>
                                        )}
                                </div>
                            ))
                        )}
                    </div>
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

export default Inquiry;
