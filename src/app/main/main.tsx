"use client";

import React, { useEffect, useState } from "react";
import styles from "./main.module.scss";
import cn from "classnames/bind";

import Loading from "@/components/loading/loading";
import BannerSwiper from "@/components/bannerSwiper/bannerSwiper";

const cx = cn.bind(styles);

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cx("mainWrapper")}>
      <BannerSwiper />
    </div>
  );
};

export default Main;
