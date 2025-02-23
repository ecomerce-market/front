"use client";
import React, { useState, useEffect } from "react";
import styles from "./sideMenu.module.scss";
import cn from "classnames/bind";
import { FaAngleRight } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";

interface MenuContent {
    label: string;
    path: string;
}

interface SideMenuProps {
    title: string;
}

const cx = cn.bind(styles);

const mypageContent: MenuContent[] = [
    { label: "개인 정보 수정", path: "/mypage/myInfo" },
    { label: "주문 내역", path: "/mypage/orderList" },
    { label: "찜한 상품", path: "/mypage/wishList" },
    { label: "배송지 관리", path: "/mypage/addressManagement" },
    { label: "상품 후기", path: "/mypage/review" },
];

const supportContent: MenuContent[] = [
    { label: "1:1 문의", path: "/support/inquiry" },
    { label: "공지사항", path: "/support/notice" },
    { label: "자주 하는 질문", path: "/support/faq" },
];

const SideMenu = ({ title }: SideMenuProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const content = pathname?.startsWith("/mypage")
        ? mypageContent
        : supportContent;

    useEffect(() => {
        const currentIndex = content.findIndex((item) =>
            pathname?.startsWith(item.path)
        );
        setActiveIndex(currentIndex >= 0 ? currentIndex : null);
    }, [pathname, content]);

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
