"use client";
import React, { useState } from "react";
import styles from "./category.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface Category {
    name: string;
    icon: string;
    subcategories: string[];
}

const categories: Category[] = [
    {
        name: "과일·견과·쌀",
        icon: "🍎",
        subcategories: [
            "친환경",
            "제철과일",
            "국산과일",
            "수입과일",
            "간편과일",
            "냉동·건과일",
            "견과류",
            "쌀·잡곡",
        ],
    },
    {
        name: "수산·해산·건어물",
        icon: "🐟",
        subcategories: ["생선", "해산물", "건어물"],
    },
];

const Category = () => {
    const [selected, setSelected] = useState<Category>(categories[0]);

    return (
        <div className={cx("container")}>
            {/* 대분류 */}
            <div className={cx("sidebar")}>
                <h2 className={cx("title")}>카테고리</h2>
                <ul>
                    {categories.map((cat) => (
                        <li
                            key={cat.name}
                            className={cx("categoryItem", {
                                active: selected.name === cat.name,
                            })}
                            onClick={() => setSelected(cat)}
                        >
                            {cat.icon} {cat.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* 중분류 */}
            <div className={cx("content")}>
                <h2 className={cx("title")}>{selected.name}</h2>
                <ul className={cx("subcategories")}>
                    {selected.subcategories.map((sub) => (
                        <li key={sub} className={cx("subcategoryItem")}>
                            {sub}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Category;
