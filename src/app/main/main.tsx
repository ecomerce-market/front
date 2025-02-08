"use client";
import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import Banner from "@/components/banner/banner";
import Link from "next/link";

const cx = cn.bind(styles);

type BannerDataType = {
  length: number;
  banners: {
    name: string;
    imgUrl: string;
    link: string;
    displayOrder: number;
    endAt: string;
  }[];
};

const Main = () => {
  const [bannerData, setBannerData] = useState<BannerDataType["banners"]>([]);

  useEffect(() => {
    const fetchbannerData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/banners", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("배너 연결실패");
        }
        const bannersData: BannerDataType = await response.json();
        console.log(bannersData);
        setBannerData(bannersData.banners);
      } catch (error) {
        console.error("배너패치오류", error);
      }
    };
    fetchbannerData();
  }, []);

  // 로딩 페이지 만들어야함함
  if (bannerData.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      {/* 베너 스와이프 처리 예정 */}
      {bannerData.map((a, i) => (
        <Link key={a.displayOrder} href={`${a.link}`}>
          {" "}
          <Banner
            key={a.displayOrder} // key 속성 추가
            src={a.imgUrl} // 직접 i.imgUrl을 사용
            alt={a.name}
            width={1440}
            height={253}
          />
        </Link>
      ))}

      {/* 상품목록 만들 예정 */}
    </div>
  );
};

export default Main;
