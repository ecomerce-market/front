export const validatePassword = (password: string): boolean => {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
};

export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
    return regex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone.replace(/\D/g, ""));
};

export const validateBirthDate = (birthDate: string): boolean => {
    const regex = /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    return regex.test(birthDate);
};

export const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z가-힣]+$/;
    return nameRegex.test(name);
};

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
