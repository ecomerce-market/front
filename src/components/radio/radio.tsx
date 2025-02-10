"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./radio.module.scss";
import { PiCheckCircle } from "react-icons/pi";

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
            <p>{title}</p>
            {subTitle && <p>({subTitle})</p>}
        </div>
    );
};

export default Radio;
