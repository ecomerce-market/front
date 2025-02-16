import React from "react";
import styles from "./orderDetail.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import DetailProductCard from "@/components/productCard/detail/product";
import Link from "next/link";

const cx = cn.bind(styles);

interface orderDetailProps {
    productNum: number;
    productType: string;
    deliveryState: string;
    price: string;
    discountPrice: string;
}

const orderDetail = (props: orderDetailProps) => {
    const { productNum, productType, deliveryState, price, discountPrice } =
        props;
    return (
        <div className={cx("orderDetailWrapper")}>
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
                <div className={cx("orderDetailSection")}>
                    <div className={cx("orderDetailTitle")}>
                        <h1 className={cx("mainTitle")}>주문 내역 상세</h1>
                    </div>
                    <div className={cx("orderDetailForm")}>
                        <div className={cx("productSection")}>
                            <div className={cx("productNum")}>
                                <h2>주문번호 {productNum}</h2>
                                <div>
                                    <p>배송 또는 상품에 문제가 있나요?</p>
                                    <Link href="/inquiry/inquiryDetail">
                                        <p className={cx("ask")}>
                                            1:1 문의하기
                                        </p>
                                    </Link>
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
                                    complete={true}
                                />
                            </div>
                        </div>
                        <div className={cx("trackingSection")}>
                            <h2 className={cx("trackingTitle")}>배송조회</h2>
                            <div className={cx("trackingInfo")}>
                                <p className={cx("deliveryType")}>
                                    {productType}
                                </p>
                                <p className={cx("deliveryStatus")}>
                                    {deliveryState}
                                </p>
                            </div>
                        </div>
                        <div className={cx("paymentSection")}>
                            <h2 className={cx("paymentTitle")}>결제정보</h2>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품금액</p>
                                <p className={cx("infoValue")}>{price}원</p>
                            </div>
                            <div className={cx("paymentInfo")}>
                                <p className={cx("infoLabel")}>상품할인금액</p>
                                <p className={cx("infoValue")}>
                                    {discountPrice}원
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default orderDetail;
