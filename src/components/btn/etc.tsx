"use client";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io"; // 하트 아이콘
import OneBtn from "./oneBtn";
import { LuBell } from "react-icons/lu"; //벨

interface EtcProps {
  heartClick?: () => void;
  bellClick?: () => void;
  onclick?: () => void;
}

const Etc: React.FC<EtcProps> = ({ heartClick, bellClick, onclick }) => {
  return (
    <div
      style={{
        width: "405px",
        display: "flex",
        alignItems: "center",
        justifyContent: "spaceBetween",
        gap: "8px",
        height: "46px",
      }}
    >
      {/* 이거버튼 컴포넌트로 만들어서 다시 할 예정? */}
      <button
        onClick={heartClick}
        style={{
          width: "46px",
          height: "46px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid var(--black-100)",
          borderRadius: "10px",
          background: "var(--white)",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
          padding: "26px 10px",
        }}
      >
        <IoMdHeartEmpty size={20} color=" var(--main-color)" />
      </button>

      {/* 이거버튼 컴포넌트로 만들어서 다시 할 예정? */}
      <button
        onClick={bellClick}
        style={{
          width: "46px",
          height: "46px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid var(--black-100)",
          borderRadius: "10px",
          background: "var(--white)",
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
          padding: "26px 10px",
        }}
      >
        <LuBell size={20} color=" var(--black-200)" />
      </button>

      <OneBtn
        onClick={onclick}
        title={"구매하기"}
        width={"301"}
        height="46"
        bgcolor="--main-color"
        color="--white"
        fontSize={"14"}
      />
    </div>
  );
};

export default Etc;
