import { UserData, FormState } from "./myInfoDetailType";

// 공통 URL
const BASE_URL = "http://localhost:3001/api/v1";

// 에러 메시지
const ERROR_MESSAGES = {
    TOKEN_MISSING: "토큰이 없습니다.",
    NETWORK_ERROR: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
    FETCH_USER_FAIL: "사용자 정보를 불러오는데 실패했습니다.",
    INVALID_PASSWORD: "현재 비밀번호가 올바르지 않습니다.",
    PASSWORD_VERIFY_FAIL: "비밀번호 확인 중 오류가 발생했습니다.",
    UPDATE_PROFILE_FAIL: "회원정보 수정 중 오류가 발생했습니다.",
    HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
} as const;

// 토큰값 가져오기
const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error(ERROR_MESSAGES.TOKEN_MISSING);
    return token;
};

// 에러 핸들링 함수
const handleApiError = async (response: Response) => {
    if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new Error(ERROR_MESSAGES.INVALID_PASSWORD);
            case 401:
                throw new Error(ERROR_MESSAGES.TOKEN_MISSING);
            case 404:
                throw new Error(ERROR_MESSAGES.FETCH_USER_FAIL);
            default:
                throw new Error(ERROR_MESSAGES.HTTP_ERROR(response.status));
        }
    }
};

export const userService = {
    // 사용자 정보 조회
    fetchUserData: async (): Promise<UserData> => {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/users/profiles`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await handleApiError(response);
        const data = await response.json();

        if (data.message === "success") {
            return data.data || data;
        }
        throw new Error(ERROR_MESSAGES.FETCH_USER_FAIL);
    },

    // 비밀번호 검증
    verifyPassword: async (currentPassword: string): Promise<void> => {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/users/passwords`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ loginPw: currentPassword }),
        });

        await handleApiError(response);
        const data = await response.json();

        if (data.message !== "success") {
            throw new Error(ERROR_MESSAGES.PASSWORD_VERIFY_FAIL);
        }
    },

    // 프로필 정보 업데이트
    updateUserProfile: async (
        updateData: Partial<FormState>
    ): Promise<void> => {
        const token = getToken();
        const formattedData = {
            ...updateData,
            phone: updateData.phone?.replace(/\D/g, ""),
            birth: updateData.birthDate,
        };
        const response = await fetch(`${BASE_URL}/users/profiles`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formattedData),
        });
        await handleApiError(response);
        const data = await response.json();
        if (data.message !== "success" && data.message !== "update success") {
            throw new Error(ERROR_MESSAGES.UPDATE_PROFILE_FAIL);
        }
    },
};
