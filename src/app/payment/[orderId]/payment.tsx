"use client";

import React from "react";
import styles from "./payment.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import PaymentCard from "@/components/productCard/payment/paymentCard";
import { BiSolidDownArrow } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import Radio from "@/components/radio/radio";
import { PaymentProps, AddressType } from "./paymentType";

const cx = cn.bind(styles);

const PaymentUI: React.FC<PaymentProps> = ({
    onFetchUserData,
    onFetchAddresses,
    onFetchOrderDetails,
    onUpdateOrder,
    onApproveOrder,
}) => {
    // usePayment 훅을 사용하지 않고 props 그대로 사용
    // (page.tsx에서 usePayment 훅을 사용하여 props를 전달받는 형태)

    // 상태 관리
    const [userData, setUserData] = React.useState(null);
    const [addresses, setAddresses] = React.useState([]);
    const [orderDetails, setOrderDetails] = React.useState({
        products: [
            {
                productId: {
                    productName: "",
                    orgPrice: 0,
                    finalPrice: 0,
                    mainImgUrl: "",
                },
                optionName: "",
                amount: 0,
            },
        ],
        totalPrice: 0,
        totalOrgPrice: 0,
        totalDiscountedPrice: 0,
        addressInfo: {
            userAddress: {
                address: "",
                extraAddr: "",
                defaultAddr: false,
            },
        },
        userInfo: {
            user: {
                _id: "",
                name: "",
                email: "",
            },
        },
        usedPoints: 0,
        paymentMethod: "none",
    });
    const [selectedAddress, setSelectedAddress] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [pointsToUse, setPointsToUse] = React.useState(0);
    const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [isApproving, setIsApproving] = React.useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        React.useState("none");

    React.useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            setError("");
            try {
                const [userData, addressesData, orderData] = await Promise.all([
                    onFetchUserData(),
                    onFetchAddresses(),
                    onFetchOrderDetails(),
                ]);

                setUserData(userData);
                setAddresses(addressesData);

                const productsWithOptions = orderData.products.map(
                    (product) => {
                        return {
                            ...product,
                            optionName: product.optionName,
                        };
                    }
                );

                const updatedOrderData = {
                    ...orderData,
                    products: productsWithOptions,
                    paymentMethod: orderData.paymentMethod || "none",
                };

                setOrderDetails(updatedOrderData);
                setSelectedPaymentMethod(updatedOrderData.paymentMethod);

                const defaultAddress =
                    addressesData.find((addr) => addr.defaultAddr) ||
                    addressesData[0];

                if (defaultAddress) {
                    const addressUpdatedOrderData = {
                        ...updatedOrderData,
                        addressInfo: {
                            userAddress: {
                                ...defaultAddress,
                                extraAddr: defaultAddress.extraAddr,
                            },
                        },
                    };
                    setOrderDetails(addressUpdatedOrderData);
                }

                setSelectedAddress(defaultAddress);
                setPointsToUse(orderData.usedPoints || 0);
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                setError("데이터를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [onFetchUserData, onFetchAddresses, onFetchOrderDetails, onUpdateOrder]);

    // 가격 계산 로직
    const calculations = React.useMemo(() => {
        try {
            // 각 상품의 할인 금액 계산
            const productDiscount = orderDetails.products.reduce(
                (total, product) => {
                    if (!product?.productId) return total;

                    const orgPrice =
                        (product.productId.orgPrice || 0) *
                        (product.amount || 0);
                    const finalPrice = product.productId.finalPrice
                        ? product.productId.finalPrice * (product.amount || 0)
                        : orgPrice;
                    return total + (orgPrice - finalPrice);
                },
                0
            );

            const totalProductPrice = orderDetails.totalOrgPrice || 0;
            const shippingFee = totalProductPrice >= 30000 ? 0 : 3000;
            const pointsUsed = orderDetails.usedPoints || 0;

            // 최종 금액 계산
            const finalAmount =
                totalProductPrice - productDiscount + shippingFee;

            return {
                totalProductPrice,
                shippingFee,
                productDiscount,
                pointsUsed,
                finalAmount,
            };
        } catch (error) {
            console.error("calculations 계산 중 에러:", error);
            return {
                totalProductPrice: 0,
                shippingFee: 0,
                productDiscount: 0,
                pointsUsed: 0,
                finalAmount: 0,
            };
        }
    }, [orderDetails]);

    // 숫자 포맷팅
    const formatPrice = (price) => {
        if (price === undefined || price === null) return "0";
        return price.toLocaleString("ko-KR");
    };

    //선택한 주소
    const getSelectedAddressText = () => {
        const address = orderDetails?.addressInfo?.userAddress;
        if (!address) return "배송지를 선택해주세요.";

        const fullAddress = [address.address, address.extraAddr]
            .filter(Boolean)
            .join(" ");

        return fullAddress.trim() || "배송지 정보가 없습니다.";
    };

    const handleAddressModal = () => setIsAddressModalOpen((prev) => !prev);

    // 주소 수정
    const handleAddressSelect = async (selectedAddr) => {
        if (isUpdating) return;
        setIsUpdating(true);
        setError("");

        try {
            const updatedOrder = await onUpdateOrder({
                userAddressId: selectedAddr.addressId,
            });

            const updatedOrderWithAddress = {
                ...orderDetails,
                addressInfo: {
                    ...orderDetails.addressInfo,
                    userAddress: {
                        address: selectedAddr.address,
                        extraAddr: selectedAddr.extraAddr,
                        defaultAddr: selectedAddr.defaultAddr,
                    },
                },
            };

            setOrderDetails(updatedOrderWithAddress);
            setSelectedAddress(selectedAddr);
        } catch (error) {
            setError(error.message || "배송지 변경에 실패했습니다.");
        } finally {
            setIsUpdating(false);
            setIsAddressModalOpen(false);
        }
    };

    const handlePaymentMethodSelect = async () => {
        try {
            const newMethod =
                selectedPaymentMethod === "none" ? "card" : "none";

            const updatedOrder = await onUpdateOrder({
                paymentMethod: newMethod,
            });

            setSelectedPaymentMethod(newMethod);
            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                paymentMethod: newMethod,
            }));
        } catch (error) {
            console.error("결제 수단 변경 실패:", error);
            setSelectedPaymentMethod("none");
            alert(`결제 수단 변경 실패: ${error.message}`);
        }
    };

    const handleApproveOrder = async () => {
        if (isApproving) {
            return;
        }

        const currentPaymentMethod =
            orderDetails.paymentMethod || selectedPaymentMethod;

        if (currentPaymentMethod === "none") {
            return;
        }

        setIsApproving(true);
        setError("");

        try {
            const approveResponse = await onApproveOrder();

            alert("결제가 완료되었습니다.");
            const addedPoints = approveResponse.addedPoints || 0;
            const totalPaidPrice =
                approveResponse.totalPaidPrice || calculations.finalAmount;
            const orderId = approveResponse.orderId;
            window.location.href =
                `/payment/complete/${orderId}?` +
                `addedPoints=${encodeURIComponent(addedPoints)}` +
                `&totalPaidPrice=${encodeURIComponent(totalPaidPrice)}`;
        } catch (error) {
            console.error("결제 오류:", error);
            const errorMessage = error.message || "결제 진행에 실패했습니다.";
            setError(errorMessage);
            alert(`결제 실패: ${error.message}`);
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <div className={cx("paymentWrapper")}>
            <h1 className={cx("paymentTitle")}>주문서</h1>
            <div className={cx("paymentForm")}>
                <section className={cx("section")}>
                    <h2 className={cx("sectionTitle")}>주문상품</h2>
                    <div className={cx("product")}>
                        {orderDetails.products[0] && (
                            <PaymentCard
                                key={
                                    orderDetails.products[0].productId
                                        .productName
                                }
                                productName={
                                    orderDetails.products[0].productId
                                        .productName
                                }
                                optionName={orderDetails.products[0].optionName}
                                orgPrice={
                                    orderDetails.products[0].productId.orgPrice
                                }
                                finalPrice={
                                    orderDetails.products[0].productId
                                        .finalPrice
                                }
                                amount={orderDetails.products[0].amount}
                                mainImgUrl={
                                    orderDetails.products[0].productId
                                        .mainImgUrl
                                }
                            />
                        )}

                        {orderDetails.products.length > 1 && (
                            <div className={cx("productAccordion")}>
                                <div
                                    className={cx("accordionHeader")}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <span className={cx("moreProducts")}>
                                        {orderDetails.products.length - 1}개
                                        상품 {isExpanded ? "접기" : "더보기"}
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
                                    {orderDetails.products
                                        .slice(1)
                                        .map((product) => (
                                            <PaymentCard
                                                key={
                                                    product.productId
                                                        .productName
                                                }
                                                productName={
                                                    product.productId
                                                        .productName
                                                }
                                                optionName={product.optionName}
                                                orgPrice={
                                                    product.productId.orgPrice
                                                }
                                                finalPrice={
                                                    product.productId.finalPrice
                                                }
                                                amount={product.amount}
                                                mainImgUrl={
                                                    product.productId.mainImgUrl
                                                }
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
                        <span>{userData?.name}</span>
                    </div>
                    <div className={cx("infoRow")}>
                        <span>이메일</span>
                        <span>{userData?.email}</span>
                    </div>
                </section>
                <section className={cx("section", "shipping-info")}>
                    <h2 className={cx("sectionTitle")}>배송 정보</h2>
                    <div className={cx("infoRow", "addressRow")}>
                        <span>배송지</span>
                        <span>{getSelectedAddressText()}</span>
                        <OneBtn
                            title="변경"
                            width="100"
                            height="42"
                            onClick={handleAddressModal}
                        />
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
                                    readOnly={true}
                                />
                            </div>
                        </section>
                        <section className={cx("section")}>
                            <h2 className={cx("sectionTitle")}>적립금</h2>
                            <div className={cx("pointSection")}>
                                <span>적립금 적용</span>
                                <div className={cx("pointInput")}>
                                    <div className={cx("inputWrapper")}>
                                        <TextInput
                                            value={String(pointsToUse)}
                                            placeholder="0"
                                            readOnly={isUpdating}
                                        />
                                        <p>
                                            사용 가능 적립금{" "}
                                            {orderDetails?.usedPoints || 0}원
                                        </p>
                                        {error && (
                                            <p className={cx("error")}>
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                    <OneBtn
                                        title="모두 사용"
                                        width="100"
                                        height="42"
                                        disabled={isUpdating}
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
                                    onClick={handlePaymentMethodSelect}
                                    bgcolor={
                                        selectedPaymentMethod === "card"
                                            ? "--main-color"
                                            : "--white"
                                    }
                                    color={
                                        selectedPaymentMethod === "card"
                                            ? "--white"
                                            : "--black"
                                    }
                                    border={
                                        selectedPaymentMethod === "card"
                                            ? "--white"
                                            : "--main-color"
                                    }
                                    borderSize="1"
                                />
                            </div>
                        </section>
                    </div>
                    <div className={cx("paymentSummary")}>
                        <h2 className={cx("summaryTitle")}>결제금액</h2>
                        <div className={cx("summaryContent")}>
                            <div className={cx("summaryRow")}>
                                <span>주문금액</span>
                                <span>
                                    {formatPrice(
                                        calculations.totalProductPrice
                                    )}
                                    원
                                </span>
                            </div>
                            <div className={cx("summaryRow", "subRow")}>
                                <span>ㄴ상품금액</span>
                                <span>
                                    {formatPrice(
                                        calculations.totalProductPrice
                                    )}
                                    원
                                </span>
                            </div>
                            <div className={cx("summaryRow", "subRow")}>
                                <span>ㄴ상품할인금액</span>
                                <span>
                                    -{formatPrice(calculations.productDiscount)}
                                    원
                                </span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>배송비</span>
                                <span>
                                    {formatPrice(calculations.shippingFee)}원
                                </span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>쿠폰할인</span>
                                <span>0원</span>
                            </div>
                            <div className={cx("summaryRow")}>
                                <span>적립금사용</span>
                                <span>
                                    -{formatPrice(calculations.pointsUsed)}원
                                </span>
                            </div>
                            <div className={cx("summaryRow", "total")}>
                                <span>최종결제금액</span>
                                <span>
                                    {formatPrice(calculations.finalAmount)}원
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("submitButton")}>
                    <OneBtn
                        title={`${formatPrice(
                            calculations.finalAmount
                        )}원 결제하기`}
                        width="320"
                        height="42"
                        onClick={handleApproveOrder}
                        disabled={isApproving}
                    />
                </div>
            </div>

            {/* 배송지 변경 모달 */}
            {isAddressModalOpen && (
                <div className={cx("modalOverlay")}>
                    <div className={cx("modalContent")}>
                        <div className={cx("modalHeader")}>
                            <h2>배송지 정보</h2>
                            <button
                                className={cx("closeBtn")}
                                onClick={handleAddressModal}
                                aria-label="닫기"
                            >
                                <FiXCircle size={24} />
                            </button>
                        </div>
                        <div className={cx("addressList")}>
                            {addresses.map((addr, index) => (
                                <div
                                    key={`${addr.addressId}-${index}`}
                                    className={cx("addressItem", {
                                        selected:
                                            selectedAddress?.addressId ===
                                            addr.addressId,
                                    })}
                                    onClick={() => handleAddressSelect(addr)}
                                >
                                    <Radio
                                        checked={
                                            selectedAddress?.addressId ===
                                            addr.addressId
                                        }
                                        onChange={() =>
                                            handleAddressSelect(addr)
                                        }
                                        name="deliveryAddress"
                                        title={`${addr.address} ${
                                            addr.extraAddr ?? ""
                                        }`}
                                        value={addr.addressId}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className={cx("confirmBtn")}
                            onClick={handleAddressModal}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentUI;
