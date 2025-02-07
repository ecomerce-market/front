"use client";
import React, { useState } from "react";
import styles from "./completed.module.scss";
import cn from "classnames/bind";
import OneBtn from "@/components/btn/oneBtn";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const CompletedId = () => {
  const router = useRouter();

  const moveLogin = (a: string) => {
    router.push(a);
  };
  return (
    <div className={cx("completedIdWrapper")}>
      <p>아이디찾기</p>
      <div className={cx("massageWrapper")}>
        <p className={cx("mainMassege")}>고객님의 계정을 찾았습니다.</p>
        <p className={cx("subMassege")}>아이디 확인 후 로그인 해주세요.</p>
      </div>

      <div className={cx("findedID")}>
        {/* {id} */}
        user0001
      </div>

      <div className={cx("btnWrapper")}>
        <OneBtn
          title={"비밀번호 찾기"}
          width={"320"}
          bgcolor="--white"
          color="--main-second-color"
          border="--main-second-color"
          borderSize="1"
          onClick={() => moveLogin("/findPw")}
        />

        <OneBtn
          title={"로그인"}
          width={"320"}
          bgcolor="--main-second-color"
          onClick={() => moveLogin("/login")}
        />
      </div>
    </div>
  );
};

export default CompletedId;
