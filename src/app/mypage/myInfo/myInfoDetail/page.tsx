"use client";
import React from "react";
import MyInfoDetail from "@/app/myInfo/myInfoDetail/myInfoDetail";
import axios from "axios";

const MyInfoPage = () => {
    // API 호출
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

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
    };

    const verifyPassword = async (currentPassword: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

        await axios.post(
            "http://localhost:3001/api/v1/users/passwords",
            { loginPw: currentPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                timeout: 5000,
            }
        );
    };

    const updateUserProfile = async (updateData: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("토큰이 없습니다.");
        }

        await axios.patch(
            "http://localhost:3001/api/v1/users/profiles",
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                timeout: 5000,
            }
        );
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
