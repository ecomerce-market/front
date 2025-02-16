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

export type FormState = {
    userId: string;
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
