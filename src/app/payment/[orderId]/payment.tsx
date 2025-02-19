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
    _id: string;
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

interface PaymentProps {
    onFetchUserData: () => Promise<UserDataType>;
    onFetchAddresses: () => Promise<AddressType[]>;
    onFetchOrderDetails: () => Promise<OrderType>;
}

const Payment = ({
    onFetchUserData,
    onFetchAddresses,
    onFetchOrderDetails,
}: PaymentProps) => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pointsToUse, setPointsToUse] = useState<number>(0);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [error, setError] = useState<string>("");

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
                setOrderDetails(orderData);

                const defaultAddress =
                    addressesData.find((addr) => addr.defaultAddr) ||
                    addressesData[0];

                if (defaultAddress) {
                    const updatedOrderData = {
                        ...orderData,
                        addressInfo: {
                            userAddress: {
                                ...defaultAddress,
                                extraAddr: defaultAddress.extraAddr,
                            },
                        },
                    };
                    setOrderDetails(updatedOrderData);
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
    }, [onFetchUserData, onFetchAddresses, onFetchOrderDetails]);

    const calculations = useMemo(() => {
        if (!orderDetails)
            return {
                totalProductPrice: 0,
                shippingFee: 0,
                productDiscount: 0,
                pointsUsed: 0,
                finalAmount: 0,
            };

        // 각 상품의 할인 금액 계산
        const productDiscount = orderDetails.products.reduce(
            (total, product) => {
                const orgPrice = product.productId.orgPrice * product.amount;
                const finalPrice = product.productId.finalPrice
                    ? product.productId.finalPrice * product.amount
                    : orgPrice;
                return total + (orgPrice - finalPrice);
            },
            0
        );
        const shippingFee = orderDetails.totalOrgPrice >= 30000 ? 0 : 3000;
        const pointsUsed = orderDetails.usedPoints || 0;

        // 최종 금액 계산
        const finalAmount =
            orderDetails.totalOrgPrice - productDiscount + shippingFee;

        return {
            totalProductPrice: orderDetails.totalOrgPrice,
            shippingFee,
            productDiscount,
            pointsUsed,
            finalAmount,
        };
    }, [orderDetails]);

    // 적립금 전체 사용 핸들러
    const handleUseAllPoints = () => {
        setPointsToUse(orderDetails?.usedPoints || 0);
    };

    // 적립금 입력 핸들러
    const handlePointsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!orderDetails) return;
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setPointsToUse(Math.min(value, orderDetails.usedPoints || 0));
    };

    // 숫자 포맷팅
    const formatPrice = (price: number) => {
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

    // 주소 선택
    const handleAddressSelect = (selectedAddr: AddressType) => {
        setSelectedAddress(selectedAddr);

        if (orderDetails) {
            const updatedOrderDetails = {
                ...orderDetails,
                addressInfo: {
                    userAddress: {
                        ...selectedAddr,
                        extraAddr: selectedAddr.extraAddr,
                    },
                },
            };
            setOrderDetails(updatedOrderDetails);
        }
    };

    if (!orderDetails) return <div>주문 정보를 불러올 수 없습니다.</div>;

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
                                        <TextInput
                                            value={String(pointsToUse)}
                                            onChange={handlePointsInput}
                                            placeholder="0"
                                            readOnly
                                        />
                                        <p>사용 가능 적립금 96원</p>
                                        <p>적립금 내역: 마이컬리-적립금</p>
                                    </div>
                                    <OneBtn
                                        title="모두 사용"
                                        width="100"
                                        height="42"
                                        onClick={handleUseAllPoints}
                                    />
                                </div>
                            </div>
                        </section>
                        {/* /1차 mvp에서 결제 수단은 none처리 */}
                        {/* <section className={cx("section")}>
                            <h2 className={cx("sectionTitle")}>결제수단</h2>
                            <div className={cx("paymentMethod")}>
                                <span>결제 수단 선택</span>
                                <OneBtn
                                    title="신용카드"
                                    width="100"
                                    height="42"
                                />
                            </div>
                        </section> */}
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
                                    key={`${addr._id}-${index}`}
                                    className={cx("addressItem", {
                                        selected:
                                            selectedAddress?._id === addr._id,
                                    })}
                                    onClick={() => handleAddressSelect(addr)}
                                >
                                    <Radio
                                        checked={
                                            selectedAddress?._id === addr._id
                                        }
                                        onChange={() =>
                                            handleAddressSelect(addr)
                                        }
                                        name="deliveryAddress"
                                        title={`${addr.address} ${
                                            addr.extraAddr ?? ""
                                        }`}
                                        value={addr._id}
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
