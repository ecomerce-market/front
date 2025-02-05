import React from "react";
import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import DetailProductCard from "@/components/productCard/detail/product";

const cx = cn.bind(styles);

const orderDetail = () => {
    return (
        <div className={cx("orderDetailWrapper")}>
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
                <div className={cx("orderDetailSection")}>
                    <div className={cx("orderDetailTitle")}>
                        <h1 className={cx("mainTitle")}>주문 내역 상세</h1>
                    </div>
                    <div className={cx("orderDetailForm")}>
                        <div className={cx("productSection")}>
                            <div className={cx("productNum")}>
                                <h2>주문번호 123456679</h2>
                                <div>
                                    <p>배송 또는 상품에 문제가 있나요?</p>
                                    <a href="" className={cx("ask")}>
                                        1:1 문의하기
                                    </a>
                                </div>
                            </div>
                            <div className={cx("productList")}>
                                <DetailProductCard
                                    title={"[올레길] 제주 슈레드 모짜렐라 치즈"}
                                    price={"8,100원"}
                                    discountPrice={"8,000원"}
                                    count={"2개"}
                                    complete={false}
                                />
                                <DetailProductCard
                                    title={"[올레길] 제주 슈레드 모짜렐라 치즈"}
                                    price={"8,100원"}
                                    count={"2개"}
                                    complete={false}
                                />
                            </div>
                        </div>
                        <div className={cx("trackingSection")}>
                            <h2 className={cx("trackingTitle")}>배송조회</h2>
                            <div className={cx("trackingInfo")}>
                                <p className={cx("deliveryType")}>냉장</p>
                                <p className={cx("deliveryStatus")}>배송완료</p>
                            </div>
                            <div className={cx("trackingInfo")}>
                                <p className={cx("deliveryType")}>냉동</p>
                                <p className={cx("deliveryStatus")}>배송완료</p>
                            </div>
                        </div>
                        <div className={cx("paymentSection")}>
                            <h2 className={cx("paymentTitle")}>결제정보</h2>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품금액</p>
                                <p className={cx("infoValue")}>64,000원</p>
                            </div>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품할인금액</p>
                                <p className={cx("infoValue")}>3,000원</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default orderDetail;
