import React from "react";
import styles from "./faq.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";

const cx = cn.bind(styles);

const faq = () => {
    return (
        <div className={cx("faqWrapper")}>
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
                    <div className={cx("faqList")}>
                        <div>
                            <p>1</p>
                            <p>교환/환불</p>
                        </div>
                        <p>교환/환불은 어떻게 하나요?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default faq;
