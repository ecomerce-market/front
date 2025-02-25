"use client";
import React, { useState, useMemo } from "react";
import styles from "./cart.module.scss";
import cn from "classnames/bind";
import Radio from "@/components/radio/radio";
import { FiMapPin } from "react-icons/fi";
import OneBtn from "@/components/btn/oneBtn";
import { FaTrashAlt } from "react-icons/fa";

const cx = cn.bind(styles);

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    discount: number;
    img: string;
    isSelected: boolean;
}

const Cart = () => {
    // 장바구니 상품 상태 관리
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            title: "[그린핑거] 힘센보습 인텐시브 크림 300g",
            price: 6000,
            quantity: 2,
            discount: 1000,
            img: "/images/example.png",
            isSelected: false,
        },
        {
            id: 2,
            title: "[그린핑거] 힘센보습 인텐시브 크림 300g",
            price: 6400,
            quantity: 2,
            discount: 1000,
            img: "/images/example.png",
            isSelected: false,
        },
    ]);

    // 임시 데이터
    const [address, setAddress] = useState("서울특별시 영등포구 여의대로 108");

    const [allSelected, setAllSelected] = useState(false);

    // 전체 선택
    const handleSelectAll = () => {
        const newAllSelected = !allSelected;
        setAllSelected(newAllSelected);
        setCartItems(
            cartItems.map((item) => ({
                ...item,
                isSelected: newAllSelected,
            }))
        );
    };

    // 개별 상품 선택
    const handleRadioChange = (itemId: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === itemId
                    ? { ...item, isSelected: !item.isSelected }
                    : item
            )
        );
        const allItemsSelected = cartItems.every((item) => item.isSelected);
        setAllSelected(allItemsSelected);
    };

    // 상품 수량 변경 함수
    const handleQuantityChange = (itemId: number, change: number) => {
        setCartItems(
            cartItems.map((item) => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // 금액 계산 로직
    const calculations = useMemo(() => {
        const selectedItems = cartItems.filter((item) => item.isSelected);

        // 상품 금액 (할인 전)
        const totalPrice = selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // 할인 금액
        const totalDiscount = selectedItems.reduce(
            (sum, item) => sum + item.discount * item.quantity,
            0
        );

        // 배송비 일단 보류하겠습니다.
        // 배송비 계산 (3만원 이상 무료배송, 기본 배송비 3000원)
        // const shippingFee = totalPrice - totalDiscount >= 30000 ? 0 : 3000;

        // 최종 결제 금액
        const finalAmount = totalPrice - totalDiscount;
        // + shippingFee;

        return {
            totalPrice,
            totalDiscount,
            // shippingFee,
            finalAmount,
        };
    }, [cartItems]);

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}원`;
    };

    return (
        <div className={cx("cartWrapper")}>
            <h1 className={cx("title")}>장바구니</h1>
            <div className={cx("cartSection")}>
                <div className={cx("productList")}>
                    <div className={cx("cartSectionHeader")}>
                        <div className={cx("selectAll")}>
                            <Radio
                                title={"전체 선택"}
                                name={"select"}
                                value={"select"}
                                onChange={handleSelectAll}
                                checked={allSelected}
                            />
                        </div>
                        <div>
                            <FaTrashAlt />
                        </div>
                    </div>
                    {cartItems.map((item) => (
                        <div className={cx("product")} key={item.id}>
                            <div className={cx("selectProduct")}>
                                <Radio
                                    title={item.title}
                                    img={item.img}
                                    imgWidth="60px"
                                    imgHeight="80px"
                                    name={""}
                                    value={""}
                                    onChange={() => handleRadioChange(item.id)}
                                    checked={item.isSelected}
                                />
                                <div className={cx("productCount")}>
                                    <p
                                        className={cx("countBtn")}
                                        onClick={() =>
                                            handleQuantityChange(item.id, -1)
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </p>
                                    <span className={cx("quantity")}>
                                        {item.quantity}개
                                    </span>
                                    <p
                                        className={cx("countBtn")}
                                        onClick={() =>
                                            handleQuantityChange(item.id, 1)
                                        }
                                    >
                                        +
                                    </p>
                                    <span className={cx("price")}>
                                        {formatPrice(
                                            item.price * item.quantity
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx("stickyContainer")}>
                    <div className={cx("paymentSection")}>
                        <div className={cx("addressWrapper")}>
                            <div className={cx("shipping")}>
                                <FiMapPin />
                                <p>배송지</p>
                            </div>
                            <p className={cx("address")}>{address}</p>
                        </div>
                        <div className={cx("paymentWrapper")}>
                            <div className={cx("paymentInfo")}>
                                <div>
                                    <p>상품금액</p>
                                    <p>
                                        {formatPrice(calculations.totalPrice)}
                                    </p>
                                </div>
                                <div>
                                    <p>상품할인금액</p>
                                    <p>
                                        -{" "}
                                        {formatPrice(
                                            calculations.totalDiscount
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>
                                        {/* {formatPrice(calculations.shippingFee)} */}
                                    </p>
                                </div>
                            </div>
                            <div className={cx("totalPrice")}>
                                <p>결제예정금액</p>
                                <p>{formatPrice(calculations.finalAmount)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("cartBtn")}>
                        <OneBtn
                            title={
                                cartItems.some((item) => item.isSelected)
                                    ? "주문하기"
                                    : "상품을 선택해주세요"
                            }
                            width={"250"}
                            height={"42"}
                            bgcolor={
                                cartItems.some((item) => item.isSelected)
                                    ? "--main-color"
                                    : "--black-100"
                            }
                            color={
                                cartItems.some((item) => item.isSelected)
                                    ? "--white"
                                    : "--black-300"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
