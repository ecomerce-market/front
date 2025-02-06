// hooks/useSignUp.ts
import { ChangeEvent, useState } from "react";

interface SignUpForm {
  signUpId: string;
  signUpPw: string;
  signUpPwChecked: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  extraAddr: string;
  birth: string;
  [key: string]: string; // 추가된 인덱스 시그니처
}

export const useSignUp = (initialValues: SignUpForm) => {
  const [form, setForm] = useState<SignUpForm>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    originalHandleChange(e);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 정보:", form);
    // 회원가입 API 호출 가능
  };

  return { form, handleChange, handleSubmit };
};
function originalHandleChange(e: ChangeEvent<HTMLInputElement>) {
  throw new Error("Function not implemented.");
}
