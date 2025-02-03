import React from "react";
import styles from "./sideMenu.module.scss";
import cn from "classnames/bind";
import { FaAngleRight } from "react-icons/fa6";

interface SideMenuProps {
    title: string;
    content: string[];
}
const cx = cn.bind(styles);

const sideMenu = (props: SideMenuProps) => {
    const { title, content } = props;

    return (
        <div className={cx("sideMenuWrapper")}>
            <div className={cx("sideMenuTitle")}>{title}</div>
            <ul className={cx("menuList")}>
                {content.map((item: string, index: number) => (
                    <li key={index} className={cx("menuContent")}>
                        {item}
                        <FaAngleRight />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default sideMenu;
