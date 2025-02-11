"use client";
import React, { useState, useEffect } from "react";
import styles from "./myInfoDetail.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TwoBtn from "@/components/btn/twoBtn";
import axios from "axios";

const cx = cn.bind(styles);

interface UserData {
    tier: string;
    name: string;
    email: string;
    loginId: string;
    phone: string;
    birth: string;
    points: number;
    couponCnt: number;
}

interface FormField {
    label: string;
    name: keyof Omit<FormState, "errors">;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    validate?: (value: string) => boolean;
    format?: (value: string) => string;
    required?: boolean;
}

interface FormState {
    username: string;
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
}

// FormField 컴포넌트: 개별 입력 필드를 렌더링
const FormField = ({
    field,
    value,
    onChange,
    error,
    inputSize,
}: {
    field: FormField;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    inputSize: { width: string; height: string };
}) => {
    // readOnly가 아니고 required이거나 값이 있는 경우에만 validation
    const shouldValidate =
        !field.readOnly && (field.required || value.length > 0);
    const hasError =
        shouldValidate && field.validate ? !field.validate(value) : false;
    const displayValue = field.format ? field.format(value) : value;

    return (
        <div>
            <span>{field.label}</span>
            <div>
                <TextInput
                    {...inputSize}
                    type={field.type || "text"}
                    value={displayValue}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                />
                {hasError && error && (
                    <span className={cx("errorMessage")}>{error}</span>
                )}
            </div>
        </div>
    );
};

const MyInfoDetail = () => {
    const inputSize = { width: "280", height: "40" };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formState, setFormState] = useState<FormState>({
        username: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        errors: {},
    });

    // 비밀번호 유효성 검사
    const validatePassword = (password: string) => {
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    };

    // 이메일 유효성 검사
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
        return regex.test(email);
    };

    // 전화번호 유효성 검사
    const validatePhoneNumber = (phone: string) => {
        const regex = /^[0-9]{10,11}$/;
        return regex.test(phone.replace(/\D/g, ""));
    };

    const validateBirthDate = (birthDate: string) => {
        const regex =
            /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(birthDate);
    };

    // 🔹 비밀번호 확인 검사
    const validateNewPasswordMatch = (
        password: string,
        confirmPassword: string
    ) => {
        if (password !== confirmPassword) {
            setErrors((prev) => ({
                ...prev,
                signUpPwChecked: "비밀번호가 일치하지 않습니다.",
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, signUpPwChecked: "" }));
        return true;
    };

    // 🔹 이름 유효성 검사 (한글/영문만 가능)
    const validateName = (name: string) => {
        const nameRegex = /^[A-Za-z가-힣]+$/;
        if (!nameRegex.test(name)) {
            setErrors((prev) => ({
                ...prev,
                name: "이름은 한글 또는 영문만 입력 가능합니다.",
            }));
            return false;
        }
        setErrors((prev) => ({ ...prev, name: "" }));
        return true;
    };

    // 전화번호 형식 변환
    const formatPhoneNumber = (value: string) => {
        const onlyDigits = value.replace(/\D/g, "");
        if (onlyDigits.length <= 3) return onlyDigits;
        if (onlyDigits.length <= 7)
            return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(3)}`;
        return `${onlyDigits.slice(0, 3)}-${onlyDigits.slice(
            3,
            7
        )}-${onlyDigits.slice(7, 11)}`;
    };

    // 생년월일 입력 처리
    const handleBirthDateChange = (value: string) => {
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

        setFormState((prev) => ({
            ...prev,
            birthDate: formattedDate,
        }));
    };

    const formFields: FormField[] = [
        {
            label: "아이디",
            name: "username",
            readOnly: true,
        },
        {
            label: "현재 비밀번호",
            name: "currentPassword",
            type: "password",
            placeholder: "비밀번호를 입력해주세요",
        },
        {
            label: "새 비밀번호",
            name: "newPassword",
            type: "password",
            placeholder: "새 비밀번호를 입력해주세요",
            validate: validatePassword,
            required: true,
        },
        {
            label: "새 비밀번호 확인",
            name: "confirmPassword",
            type: "password",
            placeholder: "새 비밀번호를 다시 입력해주세요",
            required: true,
        },
        {
            label: "이름",
            name: "name",
            required: true,
        },
        {
            label: "이메일",
            name: "email",
            validate: validateEmail,
            required: true,
        },
        {
            label: "휴대폰",
            name: "phone",
            validate: validatePhoneNumber,
            format: formatPhoneNumber,
            required: true,
        },
        {
            label: "생년월일",
            name: "birthDate",
            validate: validateBirthDate,
            required: true,
        },
    ];

    // 개인 정보 조회 API
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/v1/users/profiles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const userData = response.data.data || response.data;
                if (!userData) {
                    throw new Error("사용자 데이터가 없습니다.");
                }
                const formattedPhone = userData.phone
                    ? formatPhoneNumber(userData.phone)
                    : "";
                const formattedBirth = userData.birth
                    ? userData.birth.replace(/-/g, "/")
                    : "";
                setUserData({
                    tier: userData.tier || "",
                    name: userData.name || "",
                    email: userData.email || "",
                    loginId: userData.loginId || "",
                    phone: formattedPhone,
                    birth: formattedBirth,
                    points: userData.points || 0,
                    couponCnt: userData.couponCnt || 0,
                });
                setFormState((prev) => {
                    const newState = {
                        ...prev,
                        username: userData.loginId || "",
                        name: userData.name || "",
                        email: userData.email || "",
                        phone: formattedPhone,
                        birthDate: formattedBirth,
                        errors: {},
                    };

                    return newState;
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                }
                setFormState((prev) => ({
                    ...prev,
                    errors: {
                        form: "사용자 정보를 불러오는데 실패했습니다.",
                    },
                }));
            }
        };

        fetchUserData();
    }, []);

    // 폼 전체 유효성 검사
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (
            formState.currentPassword ||
            formState.newPassword ||
            formState.confirmPassword
        ) {
            if (!formState.currentPassword) {
                errors.currentPassword = "현재 비밀번호를 입력해주세요.";
            }
            if (
                !validateNewPasswordMatch(
                    formState.newPassword,
                    formState.confirmPassword
                )
            ) {
                errors.confirmPassword = "새 비밀번호가 일치하지 않습니다.";
            }
            if (formState.newPassword === formState.currentPassword) {
                errors.newPassword = "현재 비밀번호와 동일합니다.";
            }
            if (
                formState.newPassword &&
                !validatePassword(formState.newPassword)
            ) {
                errors.newPassword =
                    "비밀번호는 특수기호 포함 8자 이상이어야 합니다.";
            }
        }

        // 필수 필드 validation
        if (!formState.name.trim()) {
            errors.name = "이름을 입력해주세요.";
        } else if (!validateName(formState.name.trim())) {
            errors.name = "이름은 한글 또는 영문만 입력 가능합니다.";
        }

        if (!validateEmail(formState.email)) {
            errors.email = "이메일 형식이 올바르지 않습니다.";
        }
        if (!validatePhoneNumber(formState.phone)) {
            errors.phone = "전화번호 형식이 올바르지 않습니다.";
        }
        if (!validateBirthDate(formState.birthDate)) {
            errors.birthDate = "생년월일 형식이 올바르지 않습니다.";
        }

        setFormState((prev) => ({ ...prev, errors }));
        return Object.keys(errors).length === 0;
    };

    // 폼 제출 처리
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            if (formState.currentPassword) {
                try {
                    const response = await axios.post(
                        "http://localhost:3001/api/v1/users/passwords",
                        { loginPw: formState.currentPassword },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            timeout: 5000,
                        }
                    );

                    console.log(response);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.code === "ERR_NETWORK") {
                            setFormState((prev) => ({
                                ...prev,
                                errors: {
                                    form: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
                                },
                            }));
                        } else if (error.response?.status === 400) {
                            setFormState((prev) => ({
                                ...prev,
                                errors: {
                                    ...prev.errors,
                                    currentPassword:
                                        "현재 비밀번호가 올바르지 않습니다.",
                                },
                            }));
                        } else {
                            setFormState((prev) => ({
                                ...prev,
                                errors: {
                                    form: "비밀번호 확인 중 오류가 발생했습니다.",
                                },
                            }));
                        }
                    }
                    return;
                }
            }

            const updateData: any = {
                name: formState.name,
                email: formState.email,
                phone: formState.phone.replace(/\D/g, ""),
                birthDate: formState.birthDate.replace(/\//g, "-"),
            };

            if (formState.currentPassword && formState.newPassword) {
                updateData.loginPw = formState.newPassword;
            }

            const response = await axios.patch(
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

            console.log(response.data);
            setFormState((prev) => ({ ...prev, errors: {} }));
            alert("회원정보가 성공적으로 수정되었습니다.");
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    setFormState((prev) => ({
                        ...prev,
                        errors: {
                            form: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
                        },
                    }));
                } else {
                    setFormState((prev) => ({
                        ...prev,
                        errors: {
                            form: "회원정보 수정 중 오류가 발생했습니다.",
                        },
                    }));
                }
            }
        }
    };

    // 입력 필드 변경 처리
    const handleInputChange =
        (name: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (name === "birthDate") {
                handleBirthDateChange(value);
            } else if (name === "phone") {
                setFormState((prev) => ({
                    ...prev,
                    [name]: formatPhoneNumber(value),
                }));
            } else {
                setFormState((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
        };

    return (
        <div className={cx("myInfoDetailWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/myInfo" },
                            { label: "주문내역", path: "/orderList" },
                            { label: "찜한상품", path: "/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/addressManagement",
                            },
                            { label: "상품 후기", path: "/review" },
                        ]}
                    />
                </div>
                <div className={cx("checkInfo")}>
                    <h1 className={cx("mainTitle")}>개인 정보 수정</h1>
                    <div className={cx("submitForm")}>
                        {formFields.map((field) => (
                            <FormField
                                key={field.name}
                                field={field}
                                value={formState[field.name]}
                                onChange={handleInputChange(field.name)}
                                error={formState.errors[field.name]}
                                inputSize={inputSize}
                            />
                        ))}
                        {formState.errors.form && (
                            <div className={cx("errorMessage")}>
                                {formState.errors.form}
                            </div>
                        )}
                    </div>
                    <div className={cx("submitBtn")}>
                        <TwoBtn
                            leftTitle={"탈퇴하기"}
                            rightTitle={"회원정보 수정"}
                            leftBgColor={"--white"}
                            rightBgColor={"--main-color"}
                            leftBorder={"--black-100"}
                            rightBorder={"--main-color"}
                            rightOnClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfoDetail;
