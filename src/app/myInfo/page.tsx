"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import MyInfo from "./myInfo";

const Page = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("로그인이 필요합니다.");
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
                } else {
                    setError("사용자 정보를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error(error);
                setError("서버 요청 실패");
            }
        };

        fetchUserInfo();
    }, []);

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
                setError("로그인이 필요합니다.");
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
                } else if (error.response.status === 401) {
                    setError("인증이 실패했습니다. 다시 로그인 해주세요.");
                } else {
                    setError("서버 연결에 실패했습니다. 다시 시도해주세요.");
                }
            } else {
                setError("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
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
