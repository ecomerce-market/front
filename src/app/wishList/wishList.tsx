import React from "react";
import styles from "./wishList.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import PickProductCard from "@/components/productCard/pick/pickProductCard";
import { IoBasketSharp } from "react-icons/io5";

const cx = cn.bind(styles);

interface WishListProps {
    totalProduct: string;
}
const wishList = (props: WishListProps) => {
    const { totalProduct } = props;
    return (
        <div className={cx("wishListWrapper")}>
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
                <div className={cx("wishListSection")}>
                    <div className={cx("wishListTitle")}>
                        <h1 className={cx("mainTitle")}>찜한 상품</h1>
                        <p className={cx("subTitle")}>
                            찜한 상품은 최대 100개까지 저장됩니다.
                        </p>
                    </div>
                    <div className={cx("wishListCard")}>
                        <p className={cx("total")}>전체 {totalProduct}개</p>
                        <div className={cx("wishList")}>
                            <PickProductCard
                                title={"감자 2kg"}
                                discountRate={30}
                                discountPrice={"30,000"}
                                price={"31,920"}
                                leftTitle={"삭제"}
                                rightTitle={
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <IoBasketSharp size={20} />
                                        담기
                                    </span>
                                }
                            />
                            <PickProductCard
                                title={"감자 2kg"}
                                price={"31,920"}
                                leftTitle={"삭제"}
                                rightTitle={
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <IoBasketSharp size={20} />
                                        담기
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default wishList;
