"use client";

import React, { useState } from "react";
import styles from "./login.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import Link from "next/link";

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
    // 로그인 완료 시 사이트 경로 이동, 어디로 할건지?? 홈이 가장 무난한듯
  };

  return (
    <div className={cx("loginContainer")}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("inputWrapper")}>
          <TextInput
            height="46"
            width="332"
            placeholder="아이디를 입력해주세요"
            name="id"
            value={form.id}
            onChange={handleChange}
          />

          <TextInput
            height="46"
            width="332"
            placeholder="비밀번호를 입력해주세요"
            name="pw"
            value={form.pw}
            onChange={handleChange}
            type="password"
          />
        </div>

        <div className={cx("btnWrapper")}>
          <OneBtn
            color="--white"
            bgcolor="--main-color"
            title="로그인"
            width="350"
            height="46"
          />
          <Link href={"/"}>
            <OneBtn
              color="--main-color"
              bgcolor="--white"
              title="회원가입"
              width="350"
              height="46"
              border="--main-color"
              borderSize="1"
            />
          </Link>
        </div>
      </form>

      <div className={cx("sidebar")}>
        <Link href={"/"}>아이디 찾기</Link>
        <span>l</span>
        <Link href={"/"}>비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default LogIn;
