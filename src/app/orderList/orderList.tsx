import React from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";

const cx = cn.bind(styles);

const orderList = () => {
    return (
        <div className={cx("orderListWrapper")}>
            <PersonalInfo
                grade={"일반"}
                username={"김철수"}
                credit={"3,000"}
                expiringCredit={"50"}
                coupon={"4"}
            />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            "주문내역",
                            "찜한상품",
                            "배송지 관리",
                            "상품 후기",
                            "결제수단",
                        ]}
                    />
                </div>
                <div className={cx("orderListSection")}>
                    <div className={cx("orderListTitle")}>
                        <h1 className={cx("mainTitle")}>주문내역</h1>
                        <p className={cx("subTitle")}>
                            최대 3년간의 주문 내역까지 확인할 수 있어요.
                        </p>
                    </div>
                    <div className={cx("wishListCard")}>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default orderList;
