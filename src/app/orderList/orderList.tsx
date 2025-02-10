import React from "react";
import styles from "./orderList.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import OrderProductCard from "@/components/productCard/order/order";

const cx = cn.bind(styles);

const orderList = () => {
    return (
        <div className={cx("orderListWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
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
                <div className={cx("orderListSection")}>
                    <div className={cx("orderListTitle")}>
                        <h1 className={cx("mainTitle")}>주문내역</h1>
                        <p className={cx("subTitle")}>
                            최대 3년간의 주문 내역까지 확인할 수 있어요.
                        </p>
                    </div>
                    <div className={cx("orderListCard")}>
                        <OrderProductCard
                            date={"2023.02.32"}
                            title={"감자"}
                            orderNumber={"12312312"}
                            payMethod={"신용카드"}
                            price={"2034"}
                            complete={false}
                        />
                        <OrderProductCard
                            date={"2023.02.32"}
                            title={"감자"}
                            orderNumber={"12312312"}
                            payMethod={"신용카드"}
                            price={"2034"}
                            complete={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default orderList;
