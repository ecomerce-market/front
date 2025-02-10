"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./radio.module.scss";
import { PiCheckCircle } from "react-icons/pi";

interface RadioProps {
    img?: string;
    imgWidth?: string;
    imgHeight?: string;
    title: string;
    subTitle?: string;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}

const cx = cn.bind(styles);

const Radio: React.FC<RadioProps> = ({
    img,
    title,
    subTitle,
    imgWidth,
    imgHeight,
    name,
    value,
    checked = false,
    onChange,
}) => {
    const handleToggle = () => {
        onChange?.(value);
    };

    return (
        <div className={cx("inputWrapper")} onClick={handleToggle}>
            <div className={cx("icon", { checked })}>
                <PiCheckCircle />
            </div>
            {img && (
                <img
                    src={img}
                    alt={title}
                    className={cx("image")}
                    style={{
                        width: imgWidth || "auto", // 기본값 "auto"
                        height: imgHeight || "auto", // 기본값 "auto"
                    }}
                />
            )}
            <p>{title}</p>
            {subTitle && <p>({subTitle})</p>}
        </div>
    );
};

export default Radio;
