"use client";
import React from "react";
import MyInfoDetail from "@/app/mypage/myInfo/myInfoDetail/myInfoDetail";
import axios from "axios";
import { UserData, FormState } from "@/hooks/myInfoDetail/myInfoDetailType";

const MyInfoPage = () => {
    // API 호출
    const fetchUserData = async (): Promise<UserData> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

        try {
            const response = await axios.get(
                "http://localhost:3001/api/v1/users/profiles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data || response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("사용자 정보를 불러오는데 실패했습니다.");
            }
            throw error;
        }
    };

    const verifyPassword = async (currentPassword: string): Promise<void> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

        try {
            await axios.post(
                "http://localhost:3001/api/v1/users/passwords",
                { loginPw: currentPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    throw new Error(
                        "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요."
                    );
                } else if (error.response?.status === 400) {
                    throw new Error("현재 비밀번호가 올바르지 않습니다.");
                }
            }
            throw new Error("비밀번호 확인 중 오류가 발생했습니다.");
        }
    };

    const updateUserProfile = async (
        updateData: Partial<FormState>
    ): Promise<void> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

        try {
            const formattedData = {
                ...updateData,
                phone: updateData.phone?.replace(/\D/g, ""),
                birthDate: updateData.birthDate?.replace(/\//g, "-"),
            };

            await axios.patch(
                "http://localhost:3001/api/v1/users/profiles",
                formattedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    throw new Error(
                        "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요."
                    );
                }
            }
            throw new Error("회원정보 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <MyInfoDetail
            onFetchUserData={fetchUserData}
            onVerifyPassword={verifyPassword}
            onUpdateProfile={updateUserProfile}
        />
    );
};

export default MyInfoPage;
