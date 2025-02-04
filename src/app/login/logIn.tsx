"use client";

import React, { useState } from "react";
import styles from "./login.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

const LogIn = () => {
  const [form, setForm] = useState({ id: "", pw: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 정보:", form);
    // 로그인 API 여따 쓰면 될듯
  };

  return (
    <div className={cx("loginContainer")}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("inputWrapper")}>
          <TextInput
            height="46"
            width="320"
            placeholder="아이디를 입력해주세요"
            name="id"
            value={form.id}
            onChange={handleChange}
          />

          <TextInput
            height="46"
            width="320"
            placeholder="비밀번호를 입력해주세요"
            name="pw"
            value={form.pw}
            onChange={handleChange}
          />
        </div>

        <div className={cx("btnWrapper")}>
          <OneBtn
            color="--white"
            bgcolor="--main-color"
            type="submit"
            title="로그인"
            width="320"
            height="46"
          />
          <OneBtn
            color="--main-color"
            bgcolor="--white"
            title="회원가입"
            width="320"
            height="46"
          />
        </div>
      </form>
    </div>
  );
};

export default LogIn;
