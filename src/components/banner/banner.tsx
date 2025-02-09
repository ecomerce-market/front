import Image from "next/image";

import React from "react";
import styles from "./banner.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type BannerProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const Banner: React.FC<BannerProps> = ({ src, alt, width, height }) => {
  return (
    <div className={cx("bannerWrapper")}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={true}
      />
    </div>
  );
};

export default Banner;
