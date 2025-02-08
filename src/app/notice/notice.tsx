import React from "react";
import styles from "./notice.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";

const cx = cn.bind(styles);

const notice = () => {
    return (
        <div className={cx("noticeWrapper")}>
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
                    <div className={cx("noticeList")}>
                        <div>
                            <p>1</p>
                            <p>공지사항</p>
                        </div>
                        <p>2025.02.05</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default notice;
