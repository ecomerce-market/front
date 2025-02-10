"use client";
import React, { useState } from "react";
import styles from "./sideMenu.module.scss";
import cn from "classnames/bind";
import { FaAngleRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface SideMenuProps {
    title: string;
    content: { label: string; path: string }[];
}

const cx = cn.bind(styles);

const SideMenu = ({ title, content }: SideMenuProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const router = useRouter();

    const handleMenuClick = (path: string, index: number) => {
        setActiveIndex(index);
        router.push(path);
    };

    return (
        <div className={cx("sideMenuWrapper")}>
            <div className={cx("sideMenuTitle")}>{title}</div>
            <ul className={cx("menuList")}>
                {content.map(({ label, path }, index) => (
                    <li
                        key={index}
                        className={cx("menuContent", {
                            active: activeIndex === index,
                        })}
                        onClick={() => handleMenuClick(path, index)}
                    >
                        {label}
                        <FaAngleRight />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
