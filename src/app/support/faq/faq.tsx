"use client";
import React, { useState } from "react";
import styles from "./faq.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";

const cx = cn.bind(styles);
// const faqData = [
//     {
//         id: 1,
//         category: "교환환불",
//         title: "반품 진행 시, 배송비가 부과되나요?",
//         content:
//             "안녕하세요. 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. 더 자세한 내용은 여기에 작성됩니다.",
//     },
//     {
//         id: 2,
//         category: "교환환불",
//         title: "반품 진행 시, 배송비가 부과되나요?",
//         content:
//             "안녕하세요. 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. 더 자세한 내용은 여기에 작성됩니다.",
//     },
// ];
const Faq = () => {
    const [openFaqIds, setOpenFaqIds] = useState([]);
    const faqData = [];

    const handleFaqClick = (id) => {
        setOpenFaqIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((openId) => openId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div className={cx("faqWrapper")}>
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
                <div className={cx("faqSection")}>
                    <div className={cx("faqHeader")}>
                        <h1 className={cx("mainTitle")}>자주하는 질문</h1>
                        <div className={cx("faqTitle")}>
                            <div>
                                <p>번호</p>
                                <p>카테고리</p>
                            </div>
                            <p>제목</p>
                        </div>
                    </div>
                    <div className={cx("faqListContainer")}>
                        {faqData.length === 0 ? (
                            <p className={cx("noFaqs")}>게시물이 없습니다.</p>
                        ) : (
                            faqData.map((faq) => (
                                <div key={faq.id} className={cx("faqItem")}>
                                    <div
                                        className={cx("faqList")}
                                        onClick={() => handleFaqClick(faq.id)}
                                    >
                                        <div className={cx("faqInfo")}>
                                            <p>{faq.id}</p>
                                            <p>{faq.category}</p>
                                        </div>
                                        <div className={cx("dateAndIcon")}>
                                            <span>{faq.title}</span>
                                        </div>
                                    </div>
                                    {openFaqIds.includes(faq.id) && (
                                        <div className={cx("faqContent")}>
                                            <p>{faq.content}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
