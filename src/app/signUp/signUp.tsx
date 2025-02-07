"use client";

import TextInput from "@/components/input/textInput";
import { useState, FormEvent } from "react";

interface SignUpFormData {
  loginId: string;
  loginPw: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  pwChecked: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    loginId: "",
    loginPw: "",
    pwChecked: "",
    name: "",
    email: "",
    phone: "",
    birth: "",
  });

  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            formData && {
              address: "",
              extraAddr: "",
            }
          ),
        }
      );
      console.log(formData);

      if (response.status === 201) {
        // 201 상태 코드 체크
        const data = await response.json();
        alert(data.message);
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginId">아이디</label>
          <TextInput
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loginPw">비밀번호</label>
          <TextInput
            type="password"
            name="loginPw"
            value={formData.loginPw}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pwChecked">비밀번호 확인</label>
          <TextInput
            type="password"
            name="pwChecked"
            value={formData.pwChecked}
            onChange={handleChange}
          />
          {errors.pwChecked && (
            <span className="error">{errors.pwChecked}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <TextInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <TextInput
            type="email" // 이메일 입력 시 유효성 체크를 위해 type을 email로 변경
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <TextInput
            type="tel" // 전화번호 형식에 맞게 type을 tel로 변경
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birth">생년월일</label>
          <TextInput
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
          {errors.birth && <span className="error">{errors.birth}</span>}
        </div>

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;
