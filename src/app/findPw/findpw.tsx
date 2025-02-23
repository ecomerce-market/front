"use client";

import React, { useState } from "react";
import styles from "../findId/findId.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Popup from "@/components/popup/popup";

const cx = cn.bind(styles);

type FindPwType = {
  name: string;
  phone: string;
};

const FindPw = () => {
  const [formState, setFormState] = useState<FindPwType>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 이름 유효성 검사
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

  // 휴대폰 번호 유효성 검사
  const formatPhoneNumber = (phone: string) => {
    const onlyNumbers = phone.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(onlyNumbers)) {
      setErrors((prev) => ({
        ...prev,
        phone: "올바른 휴대폰 번호를 입력해주세요.",
      }));
      return phone;
    }
    setErrors((prev) => ({ ...prev, phone: "" }));
    return onlyNumbers.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  };

  // 인풋값
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (name === "name") validateName(value);
    if (name === "phone")
      setFormState((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateName(formState.name) && !errors.phone) {
      console.log("전송할 비밀번호 찾기 데이터:", formState);
      const fetchPwData = async () => {
        try {
          const res = await fetch(
            "http://localhost:3001/api/v1/accounts/passwords",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: formState.name,
                phone: formState.phone,
              }),
            }
          );
        } catch (error) {}
      };
    }
  };

  return (
    <>
      <form className={cx("formWrapper")} onSubmit={handleSubmit}>
        <h2>비밀번호 찾기</h2>
        <div className={cx("tabBar")}>
          <span className={cx("phone")}>휴대폰 인증</span>
          <span className={cx("email")}>이메일 인증</span>
        </div>
        <div className={cx("phoneWrapper")}>
          <label htmlFor="name">
            이름
            <TextInput
              width="340"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
            {errors.name && <p className={cx("error")}>{errors.name}</p>}
          </label>

          <label htmlFor="phone">
            휴대폰 번호
            <TextInput
              width="340"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className={cx("error")}>{errors.phone}</p>}
          </label>
        </div>
        <div className={cx("btnWrapper")}>
          <OneBtn
            className={cx({
              disabled: !formState.name || formState.phone.length < 10,
            })}
            title="확인"
            width="360"
            disabled={!formState.name && formState.phone.length < 10}
            type="submit"
          />
        </div>
      </form>

      {/* 서버에서 에러뜨면 나올 팝업 */}
      {/* <div className={cx("popupWrapper")}>
        <Popup
          title={"가입하신 정보를 확인해주세요."}
          rightBtn={"확인"}
          rightBtnHref={"/findId"}
        />
      </div> */}
    </>
  );
};

export default FindPw;
