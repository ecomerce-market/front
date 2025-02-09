"use client";

import React, { useEffect, useState } from "react";
import styles from "./bannerSwiper.module.scss";
import cn from "classnames/bind";
import Banner from "@/components/banner/banner";
import Link from "next/link";
import Loading from "@/components/loading/loading";

// Swiper 관련 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper 스타일
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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

const BannerSwiper = () => {
  const [bannerData, setBannerData] = useState<BannerDataType["banners"]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  if (isLoading) {
    return <Loading title="상품을 불러 오고 있습니다..." />;
  }

  return (
    <div className={cx("mainWrapper")}>
      <div className={cx("swiperContainer")}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{
            type: "fraction",
            formatFractionCurrent: (number) => String(number).padStart(2, "0"),
            formatFractionTotal: (number) => String(number).padStart(2, "0"),
            renderFraction: (currentClass, totalClass) =>
              `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          className={cx("swiper")}
        >
          {bannerData.map((banner) => (
            <SwiperSlide
              key={banner.displayOrder}
              className={cx("swiperSlide")}
            >
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
    </div>
  );
};

export default BannerSwiper;
