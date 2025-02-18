"use client";
import React, { useState } from "react";
import styles from "./notice.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";

const cx = cn.bind(styles);
// const noticeData = [
//     {
//         id: 1,
//         title: "공지사항",
//         date: "2025.02.05",
//         content:
//             "안녕하세요. 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. . 공지사항 내용입니다. 더 자세한 내용은 여기에 작성됩니다.",
//     },
//     {
//         id: 2,
//         title: "서비스 업데이트 안내",
//         date: "2025.02.04",
//         content:
//             "서비스 업데이트 관련 내용입니다. 자세한 내용은 아래와 같습니다.",
//     },
// ];
const Notice = () => {
    const [openNoticeIds, setOpenNoticeIds] = useState([]);
    const noticeData = [];

    const handleNoticeClick = (id) => {
        setOpenNoticeIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((openId) => openId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div className={cx("noticeWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "1:1 문의", path: "/support/inquiry" },
                            { label: "공지사항", path: "/support/notice" },
                            { label: "자주하는 질문", path: "/support/faq" },
                        ]}
                    />
                </div>
                <div className={cx("noticeSection")}>
                    <div className={cx("noticeHeader")}>
                        <h1 className={cx("mainTitle")}>공지사항</h1>
                        <div className={cx("noticeTitle")}>
                            <div>
                                <p>번호</p>
                                <p>제목</p>
                            </div>
                            <p>작성일</p>
                        </div>
                    </div>
                    <div className={cx("noticeListContainer")}>
                        {noticeData.length === 0 ? (
                            <p className={cx("noNotices")}>
                                게시물이 없습니다.
                            </p>
                        ) : (
                            noticeData.map((notice) => (
                                <div
                                    key={notice.id}
                                    className={cx("noticeItem")}
                                >
                                    <div
                                        className={cx("noticeList")}
                                        onClick={() =>
                                            handleNoticeClick(notice.id)
                                        }
                                    >
                                        <div className={cx("noticeInfo")}>
                                            <p>{notice.id}</p>
                                            <p>{notice.title}</p>
                                        </div>
                                        <div className={cx("dateAndIcon")}>
                                            <span>{notice.date}</span>
                                        </div>
                                    </div>
                                    {openNoticeIds.includes(notice.id) && (
                                        <div className={cx("noticeContent")}>
                                            <p>{notice.content}</p>
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

export default Notice;
