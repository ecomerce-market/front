import React from "react";
import styles from "./personalInfo.module.scss";
import cn from "classnames/bind";
import { FaAngleRight } from "react-icons/fa6";

interface PersonalInfo {
    // 등급
    grade: string;
    // 회원명
    username: string;
    // 적립금
    credit: string;
    // 소멸예정 적립급
    expiringCredit: string;
    // 쿠폰
    coupon: string;
}

const cx = cn.bind(styles);

const personalInfo = (props: PersonalInfo) => {
    const { grade, username, credit, expiringCredit, coupon } = props;
    return (
        <div className={cx("personalInfoWrapper")}>
            <div className={cx("myInfo")}>
                <div className={cx("userInfo")}>
                    <p className={cx("grade")}>{grade}</p>
                    <p className={cx("user")}>{username}님</p>
                </div>
                <div className={cx("checkGrade")}>
                    <button className={cx("gradeAll")}>전체등급 보기</button>
                    <button className={cx("nextGrade")}>
                        다음 달 예상 등급 보기
                    </button>
                </div>
            </div>
            <div className={cx("point")}>
                <div className={cx("title")}>
                    <p>적립금</p>
                    <FaAngleRight />
                </div>

                <div>
                    <p className={cx("credit")}>{credit}원</p>
                    <p className={cx("content")}>소멸예정 {expiringCredit}원</p>
                </div>
            </div>
            <div className={cx("coupon")}>
                <div className={cx("title")}>
                    <p>쿠폰</p>
                    <FaAngleRight />
                </div>
                <p className={cx("content")}>{coupon}개</p>
            </div>
        </div>
    );
};

export default personalInfo;
