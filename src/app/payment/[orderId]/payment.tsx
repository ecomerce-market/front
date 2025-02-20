"use client";
import styles from "./payment.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import PaymentCard from "@/components/productCard/payment/paymentCard";
import { BiSolidDownArrow } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import Radio from "@/components/radio/radio";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

interface ProductType {
    productId: {
        productName: string;
        orgPrice: number;
        finalPrice: number;
        mainImgUrl: string;
    };
    amount: number;
}

interface AddressType {
    addressId: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

interface UserDataType {
    _id: string;
    name: string;
    email: string;
}

interface OrderType {
    products: ProductType[];
    totalPrice: number;
    totalOrgPrice: number;
    totalDiscountedPrice: number;
    addressInfo: {
        userAddress: {
            address: string;
            extraAddr: string;
            defaultAddr: boolean;
        };
    };
    userInfo: {
        user: UserDataType;
    };
    usedPoints: number;
    paymentMethod: string;
}
interface ApproveResponse {
    totalPaidPrice: number;
    addedPoints: number;
    orderId: string;
}
interface PaymentProps {
    onFetchUserData: () => Promise<UserDataType>;
    onFetchAddresses: () => Promise<AddressType[]>;
    onFetchOrderDetails: () => Promise<OrderType>;
    onUpdateOrder: (updateData: {
        usePoint?: number;
        userAddressId?: string;
        paymentMethod?: string;
        couponId?: string;
    }) => Promise<OrderType>;
    onApproveOrder: () => Promise<ApproveResponse>;
}
const Payment = ({
    onFetchUserData,
    onFetchAddresses,
    onFetchOrderDetails,
    onUpdateOrder,
    onApproveOrder,
}: PaymentProps) => {
    const router = useRouter();

    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderType>(() => ({
        products: [
            {
                productId: {
                    productName: "",
                    orgPrice: 0,
                    finalPrice: 0,
                    mainImgUrl: "",
                },
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
    }));
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pointsToUse, setPointsToUse] = useState<number>(0);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [error, setError] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<string>("none");
    useEffect(() => {
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
                const updatedOrderData = {
                    ...orderData,
                    paymentMethod: orderData.paymentMethod || "none",
                };
                setOrderDetails(orderData);
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

    const calculations = useMemo(() => {
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
    const formatPrice = (price?: number) => {
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
    const handleAddressSelect = async (selectedAddr: AddressType) => {
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

            console.log("배송지 변경 성공:", {
                변경된_주문_정보: updatedOrderWithAddress,
            });

            setOrderDetails(updatedOrderWithAddress);
            setSelectedAddress(selectedAddr);
        } catch (error: any) {
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
        } catch (error: any) {
            console.error("결제 수단 변경 실패:", error);

            setSelectedPaymentMethod("none");

            alert(`결제 수단 변경 실패: ${error.message}`);
        }
    };

    const handleApproveOrder = async () => {
        console.log("handleApproveOrder 시작");
        console.log("현재 상태:", {
            isApproving,
            currentPaymentMethod:
                orderDetails.paymentMethod || selectedPaymentMethod,
            userData,
            orderDetails,
        });

        if (isApproving) {
            console.log("이미 승인 진행 중");
            return;
        }

        const currentPaymentMethod =
            orderDetails.paymentMethod || selectedPaymentMethod;

        if (currentPaymentMethod === "none") {
            console.log("결제수단 미선택");
            alert("결제수단을 선택해주세요.");
            return;
        }

        setIsApproving(true);
        setError("");

        try {
            const approveResponse = await onApproveOrder();

            console.log("결제:", {
                totalAmount: calculations.finalAmount,
                products: orderDetails.products.map(
                    (p) => p.productId.productName
                ),
                userEmail: userData?.email,
                orderId: approveResponse.orderId,
                paymentMethod: currentPaymentMethod,
            });

            alert("결제가 완료되었습니다.");
            const addedPoints = approveResponse.addedPoints || 0;
            const totalPaidPrice =
                approveResponse.totalPaidPrice || calculations.finalAmount;
            const orderId = approveResponse.orderId;
            router.push(
                `/payment/complete/${orderId}?` +
                    `addedPoints=${encodeURIComponent(addedPoints)}` +
                    `&totalPaidPrice=${encodeURIComponent(totalPaidPrice)}`
            );
        } catch (error: any) {
            console.error("결제 오류:", error);
            const errorMessage = error.message || "결제 진행에 실패했습니다.";

            setError(errorMessage);
            alert(`결제 실패: ${error.message}`);
        } finally {
            console.log("승인 프로세스 종료");
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
                        <PaymentCard
                            key={orderDetails.products[0].productId.productName}
                            productName={
                                orderDetails.products[0].productId.productName
                            }
                            orgPrice={
                                orderDetails.products[0].productId.orgPrice
                            }
                            finalPrice={
                                orderDetails.products[0].productId.finalPrice
                            }
                            amount={orderDetails.products[0].amount}
                            mainImgUrl={
                                orderDetails.products[0].productId.mainImgUrl
                            }
                        />
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
                    {/* <div className={cx("infoRow")}>
                        <span>휴대폰</span>
                        <span>{userData?.phone}</span>
                    </div> */}
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
                                            // onChange={handlePointsInput}
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
                                        // onClick={handleUseAllPoints}
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

export default Payment;

// // 적립금 사용 핸들러 (적립금 2차 개발이라 기능 제외)
// const handlePointsUpdate = async (points: number) => {
//     if (isUpdating) return;
//     setIsUpdating(true);
//     setError("");
//
//     try {
//         const updatedOrder = await onUpdateOrder({ usePoint: points });
//
//         setOrderDetails(updatedOrder);
//         setPointsToUse(points);
//     } catch (error: any) {
//
//         setError(error.message || "적립금 적용에 실패했습니다.");
//         setPointsToUse(orderDetails?.usedPoints || 0);
//     } finally {
//         setIsUpdating(false);
//     }
// };

// // 적립금 전체 사용 핸들러 수정
// const handleUseAllPoints = async () => {
//     const maxPoints = orderDetails?.usedPoints || 0;
//     await handlePointsUpdate(maxPoints);
// };

// // 적립금 입력 핸들러 수정
// const handlePointsInput = async (
//     e: React.ChangeEvent<HTMLInputElement>
// ) => {
//     if (!orderDetails) return;
//     const value = Math.max(0, parseInt(e.target.value) || 0);
//     const points = Math.min(value, orderDetails.usedPoints || 0);
//     await handlePointsUpdate(points);
// };

// // 쿠폰 적용 핸들러 추가 (포인트 2차 개발이라 기능 제외)
// const handleCouponApply = async (couponId: string) => {
//     if (isUpdating) return;
//     setIsUpdating(true);
//     setError("");

//     try {
//         const updatedOrder = await onUpdateOrder({ couponId });
//         setOrderDetails(updatedOrder);
//     } catch (error: any) {
//         setError(error.message || "쿠폰 적용에 실패했습니다.");
//     } finally {
//         setIsUpdating(false);
//     }
// };
