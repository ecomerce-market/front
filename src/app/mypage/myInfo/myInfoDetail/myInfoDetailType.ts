// 사용자 데이터 타입
export type UserData = {
    tier: string;
    name: string;
    email: string;
    loginId: string;
    phone: string;
    birth: string;
    points: number;
    couponCnt: number;
};

// 입력 필드 타입
export type FormField = {
    label: string;
    name: keyof Omit<FormState, "errors">;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    validate?: (value: string) => boolean;
    format?: (value: string) => string;
    required?: boolean;
};

// 정보 수정 타입
export type FormState = {
    userId: string;
    loginPw?: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    errors: {
        [key: string]: string;
    };
};
