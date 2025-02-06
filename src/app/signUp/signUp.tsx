"use client";
import React, { useState, useEffect } from "react";
import styles from "./signUp.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import { formFields } from "@/lib/formFields";
import { useSignUp } from "@/hooks/signUp/useSingUp";
import { useSignUpValidation } from "@/hooks/signUp/useSignUpValidation"; // ✅ 유효성 검사 훅 추가

const cx = cn.bind(styles);

const SignUp = () => {
  const { form, handleChange } = useSignUp({
    signUpId: "",
    signUpPw: "",
    signUpPwChecked: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    extraAddr: "",
    birth: "",
  });

  const { errors, validateAll } = useSignUpValidation(); // 유효성 검사

  // 이용약관 동의 상태 체크
  const [terms, setTerms] = useState({ required: false });
  // 유효성 검사 성공하면 버튼에 불 들어오게 하기
  const [isFormValid, setIsFormValid] = useState(false);

  // 가입하기 버튼 클릭 하면면 유효성 검사 실행
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateAll(form, terms)) {
      console.log("회원가입 정보:", form);
      // 나중에 API여기 적자
    }
  };

  useEffect(() => {
    // 모든 필드가 올바르게 입력되었는지와 에러가 없음을 체크
    const isValid =
      Object.keys(form).every(
        (key) => form[key as keyof typeof form] !== "" && !errors[key]
      ) && terms.required; // terms.required가 true여야 가입 가능

    setIsFormValid(isValid);
  }, [form, errors, terms]);

  return (
    <div className={cx("signUpWrapper")}>
      <h2>회원가입</h2>

      <form className={cx("form")} onSubmit={handleSubmit}>
        {/* 기본 입력 필드 */}
        {formFields.map((field) => (
          <label className={cx("label")} key={field.name} htmlFor={field.name}>
            {field.title}
            <TextInput
              height="46"
              width="332"
              placeholder={field.placeholder}
              name={field.name}
              // 상태와 연결
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              type={field.type}
            />
            {errors[field.name] && (
              <p className="error">{errors[field.name]}</p>
            )}{" "}
          </label>
        ))}

        {/* 주소 입력란 */}
        <label className={cx("label")} htmlFor="address">
          주소
          <div className={cx("address")}>
            <TextInput
              height="46"
              width="268"
              placeholder="주소를 입력해주세요"
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
            />
            <OneBtn
              title="검색"
              width="60"
              color="--main-color"
              bgcolor="--white"
              border="--main-color"
              borderSize="1"
            />
          </div>
          <div className={cx("addressExtra")}>
            <TextInput
              width="332"
              height="46"
              placeholder="상세 주소를 입력해주세요"
              name="extraAddr"
              value={form.extraAddr}
              onChange={handleChange}
              type="text"
            />
          </div>
        </label>

        {/* 이용 약관 동의 카드 */}
        <label className={cx("termsLabel")}>
          <input
            type="checkbox"
            checked={terms.required}
            onChange={(e) => setTerms({ required: e.target.checked })}
          />
          이용 약관에 동의합니다. (필수)
        </label>
        {errors.terms && <p className={cx("error")}>{errors.terms}</p>}

        {/* 가입하기 버튼 */}
        <OneBtn
          title="가입하기"
          width="353"
          type="submit"
          bgcolor="--main-color"
          disabled={!isFormValid} // 유효성 검사 후 활성화/비활성화
        />
      </form>
    </div>
  );
};

export default SignUp;
