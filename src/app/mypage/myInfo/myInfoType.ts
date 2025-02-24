import React from "react";

// 사용자 프로필 타입
export interface UserProfile {
    loginId: string;
}

// 개인정보 수정 타입
export interface MyInfoProps {
    userId: string;
    password: string;
    error: string;
    isLoading: boolean;
    isPasswordCorrect: boolean;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

// 비밀번호 일치 타입
export interface PasswordVerificationResponse {
    success: boolean;
    message?: string;
}
