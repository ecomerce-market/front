"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href={"/"}>
        {" "}
        <button>홈으로 돌아가기</button>
      </Link>
    </div>
  );
}
