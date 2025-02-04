"use client";

import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./radio.module.scss";
import { PiCheckCircle } from "react-icons/pi"; // 체크서클 아이콘

interface RadioProps {
  title: string;
  subTitle?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

const cx = cn.bind(styles);

const Radio: React.FC<RadioProps> = ({
  title,
  subTitle,
  name,
  value,
  checked,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
  };

  return (
    <div className={cx("inputWrapper")} onClick={handleToggle}>
      <div className={cx("icon", { checked: isChecked })}>
        <PiCheckCircle />
      </div>
      <p>{title}</p>
      {subTitle && <p>({subTitle})</p>}
    </div>
  );
};

export default Radio;
