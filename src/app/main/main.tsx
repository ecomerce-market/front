"use client";

import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import cn from "classnames/bind";
import Banner from "@/components/banner/banner";
import Link from "next/link";
import dynamic from "next/dynamic";

// 동적 import로 변경
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchBannerData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/banners", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("배너 연결 실패");
        }
        const bannersData: BannerDataType = await response.json();
        setBannerData(bannersData.banners);
      } catch (error) {
        console.error("배너 패치 오류", error);
      }
    };
    fetchBannerData();
  }, []);

  if (!isClient || bannerData.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={50}
        slidesPerView={3}
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.displayOrder}>
            <Link href={banner.link}>
              <Banner
                src={banner.imgUrl}
                alt={banner.name}
                width={1440}
                height={253}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Main;
