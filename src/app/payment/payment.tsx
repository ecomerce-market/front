"use client";
import React, { useState } from "react";
import styles from "./payment.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import PaymentCard from "@/components/productCard/payment/paymentCard";
import { BiSolidDownArrow } from "react-icons/bi";

const cx = cn.bind(styles);

interface ProductType {
    id: number;
    title: string;
    price: string;
    count: string;
}

const Payment = () => {
    // 임시 데이터
    const products: ProductType[] = [
        {
            id: 1,
            title: "[올레길] 제주 슈레드 모짜렐라 치즈",
            price: "8,100",
            count: "2",
        },
        {
            id: 2,
            title: "[프레시지] 스파이시 치킨 스테이크",
            price: "12,900",
            count: "1",
        },
        {
            id: 3,
            title: "[피코크] 트러플 리조또",
            price: "7,900",
            count: "2",
        },
    ];

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={cx("paymentWrapper")}>
            <h1 className={cx("paymentTitle")}>주문서</h1>
            <div className={cx("paymentForm")}>
                <section className={cx("section")}>
                    <h2 className={cx("sectionTitle")}>주문상품</h2>
                    <div className={cx("product")}>
                        <PaymentCard
                            title={products[0].title}
                            price={products[0].price}
                            count={products[0].count}
                        />
                        {products.length > 1 && (
                            <div className={cx("productAccordion")}>
                                <div
                                    className={cx("accordionHeader")}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <span className={cx("moreProducts")}>
                                        {products.length - 1}개 상품{" "}
                                        {isExpanded ? "접기" : "더보기"}
                                    </span>
                                    <BiSolidDownArrow
                                        className={cx("arrow", {
                                            expanded: isExpanded,
                                        })}
                                        size={20}
                                    />
                                </div>

                                <div
                                    className={cx("accordionContent", {
                                        expanded: isExpanded,
                                        collapsed: !isExpanded,
                                    })}
                                >
                                    {products.slice(1).map((product) => (
                                        <PaymentCard
                                            key={product.id}
                                            title={product.title}
                                            price={product.price}
                                            count={product.count}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                <section className={cx("section", "ordererInfo")}>
                    <h2 className={cx("sectionTitle")}>주문자 정보</h2>
                    <div className={cx("infoRow")}>
                        <span>주문자</span>
                        <span>박레이</span>
                    </div>
                    <div className={cx("infoRow")}>
                        <span>휴대폰</span>
                        <span>010-1234-5678</span>
                    </div>
                    <div className={cx("infoRow")}>
                        <span>이메일</span>
                        <span>tester01@test.com</span>
                    </div>
                </section>
                <section className={cx("section", "shipping-info")}>
                    <h2 className={cx("sectionTitle")}>배송 정보</h2>
                    <div className={cx("infoRow", "addressRow")}>
                        <span>배송지</span>
                        <span>서울시 중랑구 어디로 어디아파트 1동 123호</span>
                        <OneBtn title="변경" width="100" height="42" />
                    </div>
                </section>
                <div className={cx("paymenDetails")}>
                    <div className={cx("leftColumn")}>
                        <section className={cx("section")}>
                            <h2 className={cx("sectionTitle")}>쿠폰</h2>
                            <div className={cx("couponInput")}>
                                <span>쿠폰 적용</span>
                                <TextInput
                                    placeholder="사용 가능한 쿠폰이 없습니다."
                                    readOnly
                                />
                            </div>
                        </section>
                        <section className={cx("section")}>
                            <h2 className={cx("sectionTitle")}>적립금</h2>
                            <div className={cx("pointSection")}>
                                <span>적립금 적용</span>
                                <div className={cx("pointInput")}>
                                    <div className={cx("inputWrapper")}>
                                        <TextInput />
                                        <p>사용 가능 적립금 96원</p>
                                        <p>적립금 내역: 마이컬리-적립금</p>
                                    </div>
                                    <OneBtn
                                        title="모두 사용"
                                        width="100"
                                        height="42"
                                    />
                                </div>
                            </div>
                        </section>
                        <section className={cx("section")}>
                            <h2 className={cx("sectionTitle")}>결제수단</h2>
                            <div className={cx("paymentMethod")}>
                                <span>결제 수단 선택</span>
                                <OneBtn
                                    title="신용카드"
                                    width="100"
                                    height="42"
                                />
                            </div>
                        </section>
                    </div>
                    <div className={cx("paymentSummary")}>
                        <h2 className={cx("summaryTitle")}>결제금액</h2>
                        <div className={cx("summaryContent")}>
                            <div className={cx("summaryRow")}>
                                <span>주문금액</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow", "subRow")}>
                                <span>ㄴ상품금액</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow", "subRow")}>
                                <span>ㄴ상품할인금액</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>배송비</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>쿠폰할인</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>적립금사용</span>
                                <span>54,500원</span>
                            </div>
                            <div className={cx("summaryRow", "total")}>
                                <span>최종결제금액</span>
                                <span>54,500원</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("submitButton")}>
                    <OneBtn title="54,500원 결제하기" width="320" height="42" />
                </div>
            </div>
        </div>
    );
};

export default Payment;
