import { useState } from "react";

export const useSignUpValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({}); // 에러 메시지 저장

  // 🔹 아이디 유효성 검사 (8자 이상, 영문/숫자 가능, 한글/특수기호 불가)
  const validateId = (id: string) => {
    const idRegex = /^[A-Za-z0-9]{8,}$/;
    if (!idRegex.test(id)) {
      setErrors((prev) => ({
        ...prev,
        signUpId: "아이디는 특수기호 제외 8자 이상 입력해주세요.",
      }));
      console.log("id에러", errors);
      return false;
    }
    setErrors((prev) => ({ ...prev, signUpId: "" }));
    console.log("id 유효성검사통과", errors);
    return true;
  };

  // 🔹 비밀번호 유효성 검사 (8자 이상, 특수기호 포함, 한글 불가)
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        signUpPw: "비밀번호는 특수기호 포함 8자 이상 입력해주세요.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, signUpPw: "" }));
    return true;
  };

  // 🔹 비밀번호 확인 검사
  const validatePasswordMatch = (password: string, confirmPassword: string) => {
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

  // 🔹 이메일 유효성 검사
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "이메일 형식이 올바르지 않습니다.",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
    return true;
  };

  // 🔹 휴대폰 유효성 검사 (숫자만 입력, 하이픈 자동 입력)
  const formatPhoneNumber = (phone: string) => {
    return phone
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3"); // 하이픈 자동 추가
  };

  // 🔹 생년월일 유효성 검사 (YYYY/MM/DD 형식)
  const formatBirthDate = (birth: string) => {
    return birth
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/^(\d{4})(\d{2})(\d{2})$/, "$1/$2/$3"); // 자동 슬래시 추가
  };

  // 🔹 이용 약관 체크 확인
  const validateTerms = (terms: { [key: string]: boolean }) => {
    if (!terms["required"]) {
      setErrors((prev) => ({ ...prev, terms: "필수 항목을 선택해야 합니다." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, terms: "" }));
    return true;
  };

  // 🔹 전체 유효성 검사 실행
  const validateAll = (
    form: Record<string, string>,
    terms: { [key: string]: boolean }
  ) => {
    const isValid =
      validateId(form.signUpId) &&
      validatePassword(form.signUpPw) &&
      validatePasswordMatch(form.signUpPw, form.signUpPwChecked) &&
      validateName(form.name) &&
      validateEmail(form.email) &&
      validateTerms(terms);

    return isValid;
  };

  return {
    errors,
    validateId,
    validatePassword,
    validatePasswordMatch,
    validateName,
    validateEmail,
    formatPhoneNumber,
    formatBirthDate,
    validateTerms,
    validateAll,
  };
};
