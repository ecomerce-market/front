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
  [key: string]: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"; // ✅ 환경 변수 추가

export const useSignUp = (initialValues: SignUpForm) => {
  const [form, setForm] = useState<SignUpForm>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // 기존 에러 초기화

    try {
      const response = await fetch(`${API_URL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: form.signUpId,
          loginPw: form.signUpPw,
          name: form.name,
          email: form.email,
          phone: form.phone,
          birth: form.birth,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입 실패");
      }

      console.log("회원가입 성공:", data);
      alert("회원가입이 완료되었습니다!");
    } catch (err: any) {
      setError(err.message);
      console.error("회원가입 오류:", err.message);
      alert("회원가입 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, handleChange, handleSubmit, loading, error };
};
