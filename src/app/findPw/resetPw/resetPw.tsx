"use client";

import React, { useState } from "react";
import styles from "./resetPw.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";

const cx = cn.bind(styles);

// 1.두개의 비밀번호 입력값을 비교한다 다르면 오류처리
// 1-1. 인풋에 ''이면 버튼 비에이블
// 1-2. 인풋에 입력되면 버튼 에이블
// 1-3. 비번 일치시 로그인화면으로 이동 (비번 일치 시 로그인으로 바로 넘어가기 전에 팝업창 하나 띄울까? -- noob!)
// 1-4. 비번 불일치시 팝업 생성
// 2.조건에 만족하면 submit 때리기

type RestPwProps = {
  newPassword: string;
  newPasswordChecked: string;
};

const ResetPw = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [newPasswordChecked, setPasswordChecked] = useState("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    console.log(e.target.value);
  };

  const handlePasswordChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChecked(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = () => {
    if (setNewPassword !== setPasswordChecked) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log(setNewPassword, setPasswordChecked);
  };

  return (
    <div className={cx("resetWrapper")}>
      <p>비밀번호 재설정</p>

      <form className={cx("infoWrapper")}>
        <label htmlFor="">
          새 비밀번호 등록
          <TextInput
            onChange={handlePassword}
            width="280"
            value={newPassword}
            placeholder="새 비밀번호를 입력해주세요"
          />
        </label>
        {/* 오류 메시지 출력 */}
        <label htmlFor="">
          새 비밀번호 확인
          <TextInput
            onChange={handlePasswordChecked}
            width="280"
            value={newPasswordChecked}
            placeholder="새 비밀번호를 한번 더 입력해주세요."
          />
        </label>
        {error && <p className={cx("error")}>{error}</p>}{" "}
        {/* 오류 메시지 출력 */}
      </form>

      <div className={cx("btnWrapper")}>
        <OneBtn
          onClick={handleSubmit}
          type="submit"
          title={"확인"}
          width={"300"}
        />
      </div>
    </div>
  );
};

export default ResetPw;
