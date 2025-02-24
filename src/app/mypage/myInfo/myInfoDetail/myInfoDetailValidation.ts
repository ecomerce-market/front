import { FormState } from "./myInfoDetailType";

// 비밀번호 유효성 검사 정규 표현식
export const validatePassword = (password: string): boolean => {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
};

// 이름  유효성 검사 정규 표현식
export const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z가-힣]+$/;
    return nameRegex.test(name);
};

// 이메일 유효성 검사 정규 표현식
export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    return regex.test(email);
};

// 전화번호 유효성 검사 정규 표현식
export const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone.replace(/\D/g, ""));
};

// 생년월일 유효성 검사 정규 표현식
export const validateBirthDate = (birthDate: string): boolean => {
    const regex = /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(birthDate);
};

// 전화번호 입력 포맷팅 함수
export const formatPhoneNumber = (value: string): string => {
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length <= 3) return onlyDigits;
    if (onlyDigits.length <= 7)
        return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3)}`;
    return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(
        3,
        7
    )}-${onlyDigits.slice(7, 11)}`;
};

// 생년월일 입력 포맷팅 함수
export const formatBirthDate = (value: string): string => {
    const onlyDigits = value.replace(/\D/g, "").slice(0, 8);
    let year = onlyDigits.slice(0, 4);
    let month = onlyDigits.slice(4, 6);
    let day = onlyDigits.slice(6, 8);

    if (year.length === 4) {
        const yearNum = parseInt(year, 10);
        if (yearNum < 1900) year = "1900";
        if (yearNum > 2025) year = "2025";
    }
    if (month.length === 2) {
        const monthNum = parseInt(month, 10);
        if (monthNum < 1) month = "01";
        if (monthNum > 12) month = "12";
    }
    if (day.length === 2) {
        const dayNum = parseInt(day, 10);
        if (dayNum < 1) day = "01";
        if (dayNum > 31) day = "31";
    }

    let formattedDate = year;
    if (month) formattedDate += `/${month}`;
    if (day) formattedDate += `/${day}`;

    return formattedDate;
};

// 전체 폼 유효성 검사
export const validateForm = (formState: FormState) => {
    const errors: { [key: string]: string } = {};
    const {
        currentPassword,
        newPassword,
        confirmPassword,
        name,
        email,
        phone,
        birthDate,
    } = formState;

    const isPasswordChangeAttempted = !!(
        currentPassword ||
        newPassword ||
        confirmPassword
    );

    // 비밀번호 유효성 검사
    if (isPasswordChangeAttempted) {
        if (!currentPassword || !newPassword || !confirmPassword) {
            if (!currentPassword) {
                errors.currentPassword = "현재 비밀번호를 입력해주세요.";
            }
            if (!newPassword) {
                errors.newPassword = "새 비밀번호를 입력해주세요.";
            }
            if (!confirmPassword) {
                errors.confirmPassword = "새 비밀번호 확인을 입력해주세요.";
            }
        } else {
            if (!validatePassword(newPassword)) {
                const pwError =
                    "비밀번호는 특수기호 포함 8자 이상이어야 합니다.";
                errors.newPassword = pwError;
                errors.confirmPassword = pwError;
            }

            if (newPassword === currentPassword) {
                const sameError = "새 비밀번호가 현재 비밀번호와 동일합니다.";
                errors.newPassword = sameError;
                errors.confirmPassword = sameError;
            }

            if (newPassword !== confirmPassword) {
                const mismatchError = "새 비밀번호가 일치하지 않습니다.";
                errors.newPassword = mismatchError;
                errors.confirmPassword = mismatchError;
            }
        }
    }

    // 필수 필드 validation
    if (!name.trim()) {
        errors.name = "이름을 입력해주세요.";
    } else if (!validateName(name)) {
        errors.name = "이름은 한글 또는 영문만 입력 가능합니다.";
    }

    if (!email.trim()) {
        errors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)) {
        errors.email = "이메일 형식이 올바르지 않습니다.";
    }

    if (!phone.trim()) {
        errors.phone = "휴대폰 번호를 입력해주세요.";
    } else if (!validatePhoneNumber(phone)) {
        errors.phone = "전화번호 형식이 올바르지 않습니다.";
    }

    if (!birthDate.trim()) {
        errors.birthDate = "생년월일을 입력해주세요.";
    } else if (!validateBirthDate(birthDate)) {
        errors.birthDate = "생년월일 형식이 올바르지 않습니다.";
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};
