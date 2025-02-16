"use client";
import React, { useState, useEffect } from "react";
import styles from "./myInfoDetail.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TwoBtn from "@/components/btn/twoBtn";
import axios from "axios";
import {
    type UserData,
    type FormField,
    type FormState,
} from "@/hooks/myInfoDetail/myInfoDetailType";
import {
    validatePassword,
    validateEmail,
    validatePhoneNumber,
    validateBirthDate,
    validateName,
    formatPhoneNumber,
    formatBirthDate,
} from "@/hooks/myInfoDetail/myInfoDetailValidation";

const cx = cn.bind(styles);

// FormField 컴포넌트
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
    const validationError =
        shouldValidate && field.validate ? !field.validate(value) : false;
    const displayValue = field.format ? field.format(value) : value;
    const showError = validationError || error;
    const errorMessage = error || validationError;

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
                {showError && errorMessage && (
                    <span className={cx("errorMessage")}>{errorMessage}</span>
                )}
            </div>
        </div>
    );
};

const MyInfoDetail = () => {
    const inputSize = { width: "280", height: "40" };
    const [userData, setUserData] = useState<UserData | null>(null);
    const [formState, setFormState] = useState<FormState>({
        userId: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        errors: {},
    });

    const formFields: FormField[] = [
        {
            label: "아이디",
            name: "userId",
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
            validate: validatePassword,
            required: true,
        },
        {
            label: "이름",
            name: "name",
            validate: validateName,
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
        if (!token) return;

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
                setFormState((prev: FormState) => ({
                    ...prev,
                    userId: userData.loginId || "",
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: formattedPhone,
                    birthDate: formattedBirth,
                    errors: {},
                }));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setFormState((prev: FormState) => ({
                        ...prev,
                        errors: {
                            form: "사용자 정보를 불러오는데 실패했습니다.",
                        },
                    }));
                }
            }
        };

        fetchUserData();
    }, []);

    const validateForm = () => {
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

        // 비밀번호 변경 관련 validation
        const isPasswordChangeAttempted = !!(
            currentPassword ||
            newPassword ||
            confirmPassword
        );

        if (isPasswordChangeAttempted) {
            // 세 필드 모두 필수
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
                // 모든 필드가 입력된 경우의 validation
                if (!validatePassword(newPassword)) {
                    const pwError =
                        "비밀번호는 특수기호 포함 8자 이상이어야 합니다.";
                    errors.newPassword = pwError;
                    errors.confirmPassword = pwError;
                }

                if (newPassword === currentPassword) {
                    const sameError =
                        "새 비밀번호가 현재 비밀번호와 동일합니다.";
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
        } else if (!validateName(name.trim())) {
            errors.name = "이름은 한글 또는 영문만 입력 가능합니다.";
        }

        if (!validateEmail(email)) {
            errors.email = "이메일 형식이 올바르지 않습니다.";
        }
        if (!validatePhoneNumber(phone)) {
            errors.phone = "전화번호 형식이 올바르지 않습니다.";
        }
        if (!validateBirthDate(birthDate)) {
            errors.birthDate = "생년월일 형식이 올바르지 않습니다.";
        }

        setFormState((prev) => ({ ...prev, errors }));
        return Object.keys(errors).length === 0;
    };

    // 폼 제출 처리
    const handleSubmit = async () => {
        if (!validateForm()) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            if (formState.currentPassword) {
                try {
                    await axios.post(
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
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.code === "ERR_NETWORK") {
                            setFormState((prev: FormState) => ({
                                ...prev,
                                errors: {
                                    form: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
                                },
                            }));
                        } else if (error.response?.status === 400) {
                            setFormState((prev: FormState) => ({
                                ...prev,
                                errors: {
                                    ...prev.errors,
                                    currentPassword:
                                        "현재 비밀번호가 올바르지 않습니다.",
                                },
                            }));
                        } else {
                            setFormState((prev: FormState) => ({
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

            await axios.patch(
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

            setFormState((prev: FormState) => ({ ...prev, errors: {} }));
            alert("회원정보가 성공적으로 수정되었습니다.");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    setFormState((prev: FormState) => ({
                        ...prev,
                        errors: {
                            form: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
                        },
                    }));
                } else {
                    setFormState((prev: FormState) => ({
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
                setFormState((prev: FormState) => ({
                    ...prev,
                    [name]: formatBirthDate(value),
                }));
            } else if (name === "phone") {
                setFormState((prev: FormState) => ({
                    ...prev,
                    [name]: formatPhoneNumber(value),
                }));
            } else {
                setFormState((prev: FormState) => ({
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
