import React from "react";
import styles from "./badge.module.scss";
import cn from "classnames/bind";

interface BadgeProps {
    title: string;
}
const cx = cn.bind(styles);
const badge = (props: BadgeProps) => {
    const { title } = props;
    return (
        <div className={cx("badgeWrapper")}>
            <div>{title}</div>
        </div>
    );
};

export default badge;
