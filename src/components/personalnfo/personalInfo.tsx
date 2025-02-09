"use client";

import React, { useEffect, useState } from "react";
import styles from "./personalInfo.module.scss";
import cn from "classnames/bind";
import { FaAngleRight } from "react-icons/fa6";
import axios from "axios";

// 사용자 프로필 데이터 타입 정의
interface UserProfile {
    tier: string;
    name: string;
    loginId: string;
    email: string;
    phone: string;
    birth: string;
    points: number;
    couponCnt: number;
}

// API 응답 데이터 타입 정의
interface UserProfileResponse {
    data: UserProfile;
}

// 개인 정보 상태 타입 정의
interface PersonalInfo {
    grade: string;
    name: string;
    credit: string;
    expiringCredit: string;
    coupon: string;
}

const cx = cn.bind(styles);

const PersonalInfo = () => {
    const [token, setToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<PersonalInfo>({
        grade: "",
        name: "",
        credit: "",
        expiringCredit: "",
        coupon: "",
    });

    // 토큰 가져오기
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    // 사용자 정보 불러오는 API 연결
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!token) return;

                const response = await axios.get<UserProfileResponse>(
                    "http://localhost:3001/api/v1/users/profiles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    const userData = response.data.data;
                    // 사용자 정보 상태 업데이트
                    setUserInfo({
                        grade: userData.tier || "",
                        name: userData.name || "",
                        credit: userData.points
                            ? userData.points.toLocaleString()
                            : "0",
                        expiringCredit: "0",
                        coupon: userData.couponCnt
                            ? userData.couponCnt.toString()
                            : "0",
                    });
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                }
            }
        };

        fetchUserInfo();
    }, [token]);

    return (
        <div className={cx("personalInfoWrapper")}>
            <div className={cx("myInfo")}>
                <div className={cx("userInfo")}>
                    <p className={cx("grade")}>{userInfo.grade}</p>
                    <p className={cx("user")}>{userInfo.name}님</p>
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
                    <p className={cx("credit")}>{userInfo.credit}원</p>
                    <p className={cx("content")}>
                        소멸예정 {userInfo.expiringCredit}원
                    </p>
                </div>
            </div>
            <div className={cx("coupon")}>
                <div className={cx("title")}>
                    <p>쿠폰</p>
                    <FaAngleRight />
                </div>
                <p className={cx("content")}>{userInfo.coupon}개</p>
            </div>
        </div>
    );
};

export default PersonalInfo;
