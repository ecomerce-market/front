"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import MyInfo from "./myInfo";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthAndFetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:3001/api/v1/users/profiles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200 && response.data.data?.loginId) {
                    setUserId(response.data.data.loginId);
                    setIsAuthenticated(true);
                } else {
                    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        router.push("/login");
                    }
                } else {
                    setError("오류가 발생했습니다.");
                    router.push("/not-found");
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthAndFetchUser();
    }, [router]);

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError("");
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            const response = await axios.post(
                "http://localhost:3001/api/v1/users/passwords",
                { loginPw: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setIsPasswordCorrect(true);
            } else {
                setError("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status === 400) {
                    setError("비밀번호가 일치하지 않습니다.");
                }
            } else {
                setError("오류가 발생했습니다.");
            }
        }
    };

    return (
        <div>
            <MyInfo
                userId={userId}
                password={password}
                error={error}
                isLoading={isLoading}
                isPasswordCorrect={isPasswordCorrect}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Page;
