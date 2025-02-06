"use client";

import React, { useState } from "react";
import styles from "./findId.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
const cx = cn.bind(styles);

type FindIdType = {
  name: string;
  phone: string;
};

const FindId = () => {
  const [formState, setFormState] = useState<FindIdType>({
    name: "",
    phone: "",
  });

  //인풋값
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  //새로고침 방지
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <form className={cx("formWrapper")} onSubmit={handleSubmit}>
      <h2>아이디 찾기</h2>
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
        </label>

        <label htmlFor="phone">
          휴대폰 번호
          <TextInput
            width="340"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
          />
        </label>
      </div>
      <div
        className={cx("btnWrapper", {
          disabled: !formState.name || !formState.phone,
        })}
      >
        <OneBtn
          title={"확인"}
          width={"360"}
          disabled={!formState.name || !formState.phone}
          type="submit"
        />
        {/* 밥먹고 disable 주고 tabbar 다듬기 */}
      </div>
    </form>
  );
};

export default FindId;
