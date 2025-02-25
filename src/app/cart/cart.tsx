"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./cart.module.scss";
import cn from "classnames/bind";
import Radio from "@/components/radio/radio";
import { FiMapPin } from "react-icons/fi";
import OneBtn from "@/components/btn/oneBtn";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CartItem, Address } from "./cartType";
import {
    fetchAddresses,
    fetchCartData,
    deleteCartItems,
    createOrder,
} from "./cartService";

const cx = cn.bind(styles);

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(
        null
    );
    const [allSelected, setAllSelected] = useState(false);

    const router = useRouter();

    // 배송지 정보 불러오기
    useEffect(() => {
        const getAddresses = async () => {
            try {
                const data = await fetchAddresses();
                setAddresses(data);

                const defaultAddress = data.find((addr) => addr.defaultAddr);
                if (defaultAddress) {
                    setSelectedAddress(defaultAddress);
                }
            } catch (error) {
                console.error("배송지 데이터 로딩 중 오류 발생:", error);
            }
        };

        getAddresses();
    }, []);

    // 장바구니 정보 불러오기
    useEffect(() => {
        const getCartData = async () => {
            try {
                setLoading(true);

                const data = await fetchCartData();
                setCartItems(data);
            } catch (error) {
                console.error("장바구니 데이터 로딩 중 오류 발생:", error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "알 수 없는 오류가 발생했습니다."
                );
            } finally {
                setLoading(false);
            }
        };

        getCartData();
    }, []);

    // 라디오 버튼 상태 변경
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

    // 개별 상품 라디오 버튼 상태 변경
    const handleRadioChange = (itemId: string) => {
        const updatedItems = cartItems.map((item) =>
            item.id === itemId
                ? { ...item, isSelected: !item.isSelected }
                : item
        );

        setCartItems(updatedItems);

        const allItemsSelected = updatedItems.every((item) => item.isSelected);
        setAllSelected(allItemsSelected);
    };

    // 장바구니 상품 삭제
    const handleDeleteItems = async () => {
        try {
            const isAllSelected =
                allSelected || cartItems.every((item) => item.isSelected);

            if (isAllSelected) {
                await deleteCartItems([]);
                setCartItems([]);
                setAllSelected(false);
            } else {
                const selectedItemIds = cartItems
                    .filter((item) => item.isSelected)
                    .map((item) => item.id);

                await deleteCartItems(selectedItemIds);
                setCartItems(cartItems.filter((item) => !item.isSelected));
            }

            setAllSelected(false);
        } catch (error) {
            console.error("장바구니 삭제 중 오류 발생:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "삭제 중 오류가 발생했습니다."
            );
        }
    };

    // 주문서 생성
    const handleCreateOrder = async () => {
        const selectedItems = cartItems.filter((item) => item.isSelected);

        if (selectedItems.length === 0) {
            alert("주문할 상품을 선택해주세요.");
            return;
        }

        const orderProducts = selectedItems.map((item) => ({
            productId: item.id,
            amount: item.quantity,
            optionName: item.optionName,
        }));

        try {
            const orderData = await createOrder(orderProducts);

            alert("주문이 성공적으로 완료되었습니다.");

            const remainingCartItems = cartItems.filter(
                (item) => !item.isSelected
            );
            setCartItems(remainingCartItems);

            router.push(`/payment/${orderData.order.orderId}`);
        } catch (error) {
            console.error("주문 생성 중 오류 발생:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "주문 생성 중 오류가 발생했습니다."
            );
        }
    };

    // 가격 포맷팅
    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}원`;
    };

    // 금액 계산
    const calculations = useMemo(() => {
        const selectedItems = cartItems.filter((item) => item.isSelected);

        const totalPrice = selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        const totalDiscount = selectedItems.reduce(
            (sum, item) => sum + item.discount * item.quantity,
            0
        );
        const finalAmount = totalPrice - totalDiscount;

        return {
            totalPrice,
            totalDiscount,
            finalAmount,
        };
    }, [cartItems]);

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
                        <div
                            onClick={handleDeleteItems}
                            style={{ cursor: "pointer" }}
                        >
                            <FaTrashAlt />
                        </div>
                    </div>
                    {cartItems.length === 0 ? (
                        <div className={cx("emptyCart")}>
                            <p>장바구니에 상품이 없습니다.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div className={cx("product")} key={item.id}>
                                <div className={cx("selectProduct")}>
                                    <Radio
                                        title={
                                            item.optionName
                                                ? `${item.title} (${item.optionName})`
                                                : item.title
                                        }
                                        img={item.img}
                                        imgWidth="60px"
                                        imgHeight="80px"
                                        name={""}
                                        value={""}
                                        onChange={() =>
                                            handleRadioChange(item.id)
                                        }
                                        checked={item.isSelected}
                                    />
                                    <div className={cx("productCount")}>
                                        <span className={cx("quantity")}>
                                            {item.quantity}개
                                        </span>
                                        <span className={cx("finalPrice")}>
                                            {formatPrice(
                                                item.finalPrice * item.quantity
                                            )}
                                        </span>
                                        {item.discount > 0 && (
                                            <span
                                                className={cx("originalPrice")}
                                            >
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className={cx("stickyContainer")}>
                    <div className={cx("paymentSection")}>
                        <div className={cx("addressWrapper")}>
                            <div className={cx("shipping")}>
                                <FiMapPin />
                                <p>배송지</p>
                            </div>
                            {addresses.length > 0 ? (
                                <div className={cx("addressList")}>
                                    <div className={cx("selectedAddress")}>
                                        <p>
                                            {addresses[0].address}{" "}
                                            {addresses[0].extraAddr}
                                            {addresses[0].defaultAddr && (
                                                <span
                                                    className={cx(
                                                        "defaultBadge"
                                                    )}
                                                ></span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>등록된 배송지가 없습니다.</p>
                            )}
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
                                    <p>무료</p>
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
                                cartItems.length > 0 &&
                                cartItems.some((item) => item.isSelected)
                                    ? "주문하기"
                                    : "상품을 선택해주세요"
                            }
                            width={"250"}
                            height={"42"}
                            bgcolor={
                                cartItems.length > 0 &&
                                cartItems.some((item) => item.isSelected)
                                    ? "--main-color"
                                    : "--black-100"
                            }
                            color={
                                cartItems.length > 0 &&
                                cartItems.some((item) => item.isSelected)
                                    ? "--white"
                                    : "--black-300"
                            }
                            onClick={handleCreateOrder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
