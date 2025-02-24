"use client";

import React, { useState, useEffect } from "react";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import TwoBtn from "@/components/btn/twoBtn";
import FormField from "./myInfoDetailFormFeild";
import {
    UserData,
    FormState,
    FormField as FormFieldType,
} from "./myInfoDetailType";
import {
    validatePassword,
    validateEmail,
    validatePhoneNumber,
    validateBirthDate,
    validateName,
} from "./myInfoDetailValidation";
import {
    validateForm,
    formatPhoneNumber,
    formatBirthDate,
} from "./myInfoDetailValidation";
import styles from "./myInfoDetail.module.scss";

const cx = cn.bind(styles);

interface MyInfoDetailProps {
    onFetchUserData: () => Promise<UserData>;
    onVerifyPassword: (currentPassword: string) => Promise<void>;
    onUpdateProfile: (updateData: Partial<FormState>) => Promise<void>;
}

// 각 필드 정보
const formFields: FormFieldType[] = [
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
        format: formatBirthDate,
        required: true,
    },
];

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

    // 사용자 정보 불러오기
    useEffect(() => {
        const formatUserData = (data: UserData) => ({
            tier: data.tier ?? "",
            name: data.name ?? "",
            email: data.email ?? "",
            loginId: data.loginId ?? "",
            phone: data.phone ? formatPhoneNumber(data.phone) : "",
            birth: data.birth?.replace(/-/g, "/") ?? "",
            points: data.points ?? 0,
            couponCnt: data.couponCnt ?? 0,
        });

        const fetchData = async () => {
            try {
                const data = await onFetchUserData();
                const formattedData = formatUserData(data);

                setUserData(formattedData);
                setFormState((prev) => ({
                    ...prev,
                    userId: formattedData.loginId,
                    name: formattedData.name,
                    email: formattedData.email,
                    phone: formattedData.phone,
                    birthDate: formattedData.birth,
                }));
            } catch (error) {
                setFormState((prev) => ({
                    ...prev,
                    errors: { form: "사용자 정보를 불러오는데 실패했습니다." },
                }));
            }
        };

        fetchData();
    }, [onFetchUserData]);

    // 폼 제출
    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const { isValid, errors } = validateForm(formState);
            if (!isValid) {
                throw new Error("validation_error", { cause: errors });
            }
            if (
                formState.currentPassword ||
                formState.newPassword ||
                formState.confirmPassword
            ) {
                try {
                    await onVerifyPassword(formState.currentPassword);
                } catch (error) {
                    setFormState((prev) => ({
                        ...prev,
                        errors: {
                            ...prev.errors,
                            currentPassword:
                                "현재 비밀번호가 일치하지 않습니다.",
                        },
                    }));
                    setIsSubmitting(false);
                    return;
                }
            }

            const updateData = {
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                birthDate: formState.birthDate,
                ...(formState.currentPassword && formState.newPassword
                    ? { loginPw: formState.newPassword }
                    : {}),
            };

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
            if (
                error instanceof Error &&
                error.message === "validation_error"
            ) {
                setFormState((prev) => ({
                    ...prev,
                    errors: error.cause as { [key: string]: string },
                }));
            } else {
                setFormState((prev) => ({
                    ...prev,
                    errors: {
                        ...prev.errors,
                        form: "회원정보 수정 중 오류가 발생했습니다.",
                    },
                }));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // 폼 입력값 변경 처리
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
                    <SideMenu title={"마이컬리"} />
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
