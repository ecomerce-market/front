"use client";
import React, { useState, useEffect } from "react";
import styles from "./myInfoDetail.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TwoBtn from "@/components/btn/twoBtn";
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

interface MyInfoDetailProps {
    onFetchUserData: () => Promise<UserData>;
    onVerifyPassword: (currentPassword: string) => Promise<void>;
    onUpdateProfile: (updateData: Partial<FormState>) => Promise<void>;
}

const FormField = ({
    field,
    value = "",
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
                {error && <span className={cx("errorMessage")}>{error}</span>}
            </div>
        </div>
    );
};

const MyInfoDetail: React.FC<MyInfoDetailProps> = ({
    onFetchUserData,
    onVerifyPassword,
    onUpdateProfile,
}) => {
    const inputSize = { width: "280", height: "40" };
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await onFetchUserData();
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

                setFormState((prev) => ({
                    ...prev,
                    userId: userData.loginId || "",
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: formattedPhone,
                    birthDate: formattedBirth,
                }));
            } catch (error) {
                setFormState((prev) => ({
                    ...prev,
                    errors: {
                        form: "사용자 정보를 불러오는데 실패했습니다.",
                    },
                }));
            }
        };

        fetchData();
    }, [onFetchUserData]);

    const validateField = (name: keyof FormState, value: string) => {
        const field = formFields.find((f) => f.name === name);
        if (!field?.validate) return "";

        const isValid = field.validate(value);
        if (!isValid) {
            switch (name) {
                case "name":
                    return "이름은 한글 또는 영문만 입력 가능합니다.";
                case "email":
                    return "이메일 형식이 올바르지 않습니다.";
                case "phone":
                    return "전화번호 형식이 올바르지 않습니다.";
                case "birthDate":
                    return "생년월일 형식이 올바르지 않습니다.";
                default:
                    return "";
            }
        }
        return "";
    };

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

        const isPasswordChangeAttempted = !!(
            currentPassword ||
            newPassword ||
            confirmPassword
        );

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
        } else {
            const nameError = validateField("name", name);
            if (nameError) errors.name = nameError;
        }

        if (!email.trim()) {
            errors.email = "이메일을 입력해주세요.";
        } else {
            const emailError = validateField("email", email);
            if (emailError) errors.email = emailError;
        }

        if (!phone.trim()) {
            errors.phone = "휴대폰 번호를 입력해주세요.";
        } else {
            const phoneError = validateField("phone", phone);
            if (phoneError) errors.phone = phoneError;
        }

        if (!birthDate.trim()) {
            errors.birthDate = "생년월일을 입력해주세요.";
        } else {
            const birthError = validateField("birthDate", birthDate);
            if (birthError) errors.birthDate = birthError;
        }

        return { isValid: Object.keys(errors).length === 0, errors };
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const { isValid, errors } = validateForm();
        if (!isValid) {
            setFormState((prev) => ({
                ...prev,
                errors: errors,
            }));
            setIsSubmitting(false);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setIsSubmitting(false);
            return;
        }

        try {
            if (formState.currentPassword) {
                try {
                    await onVerifyPassword(formState.currentPassword);
                } catch (error) {
                    const errorMessage =
                        error instanceof Error
                            ? error.message
                            : "비밀번호 확인 중 오류가 발생했습니다.";
                    setFormState((prev) => ({
                        ...prev,
                        errors: {
                            ...prev.errors,
                            currentPassword: errorMessage,
                        },
                    }));
                    setIsSubmitting(false);
                    return;
                }
            }

            const updateData: Partial<FormState> = {
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                birthDate: formState.birthDate,
            };

            if (formState.currentPassword && formState.newPassword) {
                updateData.loginPw = formState.newPassword;
            }

            await onUpdateProfile(updateData);

            setFormState((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                errors: {},
            }));
            alert("회원정보가 성공적으로 수정되었습니다.");
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "회원정보 수정 중 오류가 발생했습니다.";
            setFormState((prev) => ({
                ...prev,
                errors: {
                    ...prev.errors,
                    form: errorMessage,
                },
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange =
        (name: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            let updatedValue = value;

            if (name === "birthDate") {
                updatedValue = formatBirthDate(value);
            } else if (name === "phone") {
                updatedValue = formatPhoneNumber(value);
            }

            setFormState((prev) => {
                const updatedErrors = { ...prev.errors };
                delete updatedErrors[name];

                return {
                    ...prev,
                    [name]: updatedValue,
                    errors: updatedErrors,
                };
            });
        };

    return (
        <div className={cx("myInfoDetailWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/mypage/myInfo" },
                            { label: "주문내역", path: "/mypage/orderList" },
                            { label: "찜한상품", path: "/mypage/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/mypage/addressManagement",
                            },
                            { label: "상품 후기", path: "/mypage/review" },
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
