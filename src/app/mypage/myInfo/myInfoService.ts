import { UserProfile, PasswordVerificationResponse } from "./myInfoType";

// 공통 URL
const BASE_URL = "http://localhost:3001/api/v1";

// 토큰값 가져오기
const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error(ERROR_MESSAGES.TOKEN_MISSING);
    return token;
};

// 에러 메시지
export const ERROR_MESSAGES = {
    E009: "사용자 인증에 실패했습니다.",
    TOKEN_MISSING: "사용자 인증에 실패했습니다.",
    HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
    PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다.",
    UNKNOWN_ERROR: "오류가 발생했습니다.",
} as const;

// 에러 핸들링 함수
const handleApiError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();

        switch (response.status) {
            case 401:
                if (errorData.code === "E009")
                    throw new Error(ERROR_MESSAGES.E009);
                break;
            default:
                throw new Error(ERROR_MESSAGES.HTTP_ERROR(response.status));
        }
    }
};

//  API 목록
export const authService = {
    // 사용자 프로필 조회
    async getUserProfile(): Promise<UserProfile> {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/users/profiles`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await handleApiError(response);
        const data = await response.json();

        if (data.message === "success") {
            return data.data;
        }

        throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    },

    // 비밀번호 검증
    async verifyPassword(
        password: string
    ): Promise<PasswordVerificationResponse> {
        const token = getToken();

        try {
            const response = await fetch(`${BASE_URL}/users/passwords`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ loginPw: password }),
            });

            const data = await response.json();

            if (response.ok && data.message === "password is correct") {
                return { success: true };
            }

            return {
                success: false,
                message: ERROR_MESSAGES.PASSWORD_MISMATCH,
            };
        } catch (error) {
            return {
                success: false,
                message: ERROR_MESSAGES.UNKNOWN_ERROR,
            };
        }
    },
};
