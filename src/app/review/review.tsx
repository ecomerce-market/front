import React from "react";
import styles from "./review.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import ReviewCard from "@/components/productCard/review/reviewCard";
const cx = cn.bind(styles);
const review = () => {
    return (
        <div className={cx("reviewWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/myInfo" },
                            { label: "주문내역", path: "/orderList" },
                            { label: "찜한상품", path: "/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/addressManagement",
                            },
                            { label: "상품 후기", path: "/review" },
                        ]}
                    />
                </div>
                <div className={cx("reviewWrapper")}>
                    <h1 className={cx("review")}>상품 후기</h1>
                    <div className={cx("reviewdetail")}>
                        <ReviewCard
                            title={"감자 2kg"}
                            discountPrice={"23,000"}
                            discountRate={30}
                            price={"25,000"}
                            btntitle={"후기 작성하기"}
                            btnwidth={"155"}
                            btnHeight={"47"}
                            lateDate={"7"}
                            purchase={3}
                            btnColor={"--main-color"}
                            color={"--white"}
                        />
                        <ReviewCard
                            title={"감자 2kg"}
                            price={"25,000"}
                            btntitle={"후기 보러가기"}
                            btnwidth={"155"}
                            btnHeight={"47"}
                            purchase={3}
                            btnColor={"--white"}
                            color={"--black"}
                            borderColor={"--black-300"}
                            borderSize="1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default review;
