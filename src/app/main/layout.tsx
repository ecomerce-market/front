import BannerSwiper from "@/components/main/bannerSwiper/bannerSwiper";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <BannerSwiper />

      {children}
    </div>
  );
}
