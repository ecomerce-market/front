"use client";

import TextInput from "@/components/input/textInput";
import dynamic from "next/dynamic";
import { useSignUpValidation } from "@/hooks/signUp/useSignUpValidation";
import { useState, FormEvent, useEffect } from "react";
import OneBtn from "@/components/btn/oneBtn";
import styles from "./signUp.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";
const cx = cn.bind(styles);

interface SignUpFormData {
  loginId: string;
  loginPw: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  extraAddr: string;
  pwChecked: string;
}

const DaumPostcode = dynamic(() => import("react-daum-postcode"), {
  ssr: false,
});

const SignUp = () => {
  const {
    errors,
    formatPhoneNumber,
    formatBirthDate,
    validateId,
    validatePassword,
    validatePasswordMatch,
    validateName,
    validateEmail,
    validateAll,
  } = useSignUpValidation();

  const [formData, setFormData] = useState<SignUpFormData>({
    loginId: "",
    loginPw: "",
    name: "",
    email: "",
    phone: "",
    birth: "",
    address: "",
    extraAddr: "",
    pwChecked: "",
  });

  // const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleComplete = (data: any) => {
    setFormData((prev) => ({ ...prev, address: data.address })); // 주소 업데이트
    setIsOpen(false); // 검색창 닫기
  };

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
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);

      if (response.status === 200) {
        // 201 상태 코드 체크 200으로 설정되어있음 주의
        const data = await response.json();
        alert("회원가입 완료");
        router.push("/"); // 로그인 성공 시 홈으로 이동
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.message);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(`입력 변경됨: ${name} = ${value}`);

    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    } else if (name === "birth") {
      formattedValue = formatBirthDate(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    console.log("현재 에러 상태:", errors);

    if (name === "loginId") validateId(value);
    if (name === "loginPw") validatePassword(value);

    if (name === "pwChecked") validatePasswordMatch(formData.loginPw, value);
    if (name === "name") validateName(value);
    if (name === "email") validateEmail(value);
  };

  return (
    <div className={cx("signup-container")}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label htmlFor="loginId">아이디</label>
          <TextInput
            type="text"
            width="235"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
          />
          {errors.signUpId && <p className={cx("error")}>{errors.signUpId}</p>}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="loginPw">비밀번호</label>
          <TextInput
            type="password"
            width="235"
            name="loginPw"
            value={formData.loginPw}
            onChange={handleChange}
          />
          {errors.signUpPw && <p className={cx("error")}>{errors.signUpPw}</p>}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="pwChecked">비밀번호 확인</label>
          <TextInput
            type="password"
            width="235"
            name="pwChecked"
            value={formData.pwChecked}
            onChange={handleChange}
          />
          {errors.signUpPwChecked && (
            <p className={cx("error")}>{errors.signUpPwChecked}</p>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="name">이름</label>
          <TextInput
            width="235"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={cx("error")}>{errors.name}</p>}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="email">이메일</label>
          <TextInput
            type="email"
            width="235"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={cx("error")}>{errors.email}</p>}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="phone">전화번호</label>
          <TextInput
            width="235"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="birth">생년월일</label>
          <TextInput
            width="235"
            type="text"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
          {errors.birth && <span className="error">{errors.birth}</span>}
        </div>

        <div className={cx("form-group-address")}>
          <label htmlFor="address">주소</label>
          <div className={cx("form-address")}>
            <TextInput
              type="text"
              width="180"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={true}
              placeholder={"검색 버튼으로 입력해주세요"}
            />

            {/* 버튼 기본값은 submit이다. 그래서 타입을 변경해줘야햇다. */}
            <OneBtn
              title={"검색"}
              width={"50"}
              fontSize="12"
              height={"38"}
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
              padding="10px"
            />
          </div>
          {isOpen && (
            <div className={cx("postcode-container")}>
              <DaumPostcode onComplete={handleComplete} />
            </div>
          )}
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="extraAddr">상세주소</label>
          <TextInput
            type="text"
            name="extraAddr"
            width="235"
            value={formData.extraAddr}
            onChange={handleChange}
          />
        </div>
        <div className={cx("signUpBtnWrapper")}>
          <OneBtn title={"가입하기"} width={"250"} height="20" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
