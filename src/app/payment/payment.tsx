"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./payment.module.scss";
import cn from "classnames/bind";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import PaymentCard from "@/components/productCard/payment/paymentCard";
import { BiSolidDownArrow } from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";
import Radio from "@/components/radio/radio";

const cx = cn.bind(styles);

interface ProductType {
    id: number;
    title: string;
    price: string;
    discountPrice?: string;
    count: string;
}
interface AddressType {
    id: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

interface UserDataType {
    name: string;
    phone: string;
    email: string;
}

interface PaymentProps {
    onFetchUserData: () => Promise<UserDataType>;
}

const Payment = ({ onFetchUserData }: PaymentProps) => {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pointsToUse, setPointsToUse] = useState<number>(0);
    const [availablePoints] = useState<number>(96);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [error, setError] = useState<string>("");
    useState<string>("");

    // 주소 목록 불러오기
    const fetchAddresses = async () => {
        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("인증 토큰이 없습니다.");
            }

            const response = await fetch(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
                }/api/v1/users/addresses`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "success" && Array.isArray(data.addresses)) {
                setAddresses(data.addresses);
                const defaultAddress =
                    data.addresses.find((addr) => addr.defaultAddr) ||
                    data.addresses[0];
                setSelectedAddress(defaultAddress);
            }
        } catch (error) {
            console.error("배송지 목록 불러오기 실패:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "알 수 없는 오류가 발생했습니다."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // 주문자 정보 불러오기
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const userData = await onFetchUserData();
                setUserData(userData);
                await fetchAddresses();
            } catch (error) {
                console.error("초기 데이터 로딩 실패:", error);
                setError("데이터를 불러오는데 실패했습니다.");
            }
        };

        fetchInitialData();
    }, [onFetchUserData]);

    // 임시 데이터
    const products: ProductType[] = [
        {
            id: 1,
            title: "[올레길] 제주 슈레드 모짜렐라 치즈",
            price: "8,100",
            discountPrice: "7,000",
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

    const calculations = useMemo(() => {
        const parsePrice = (price: string): number =>
            parseInt(price.replace(/[^\d]/g, "")) || 0;

        const totalProductPrice = products.reduce(
            (sum, product) =>
                sum + parsePrice(product.price) * parseInt(product.count),
            0
        );

        const itemDiscounts = products.reduce((sum, product) => {
            if (!product.discountPrice) return sum;
            const discount =
                (parsePrice(product.price) -
                    parsePrice(product.discountPrice)) *
                parseInt(product.count);
            return sum + discount;
        }, 0);

        const shippingFee = totalProductPrice >= 30000 ? 0 : 3000;
        const pointsUsed = Math.min(pointsToUse, availablePoints);
        const finalAmount =
            totalProductPrice + shippingFee - itemDiscounts - pointsUsed;

        return {
            totalProductPrice,
            shippingFee,
            productDiscount: itemDiscounts,
            pointsUsed,
            finalAmount,
        };
    }, [products, pointsToUse, availablePoints]);

    // 적립금 전체 사용 핸들러
    const handleUseAllPoints = () => {
        setPointsToUse(availablePoints);
    };

    // 적립금 입력 핸들러
    const handlePointsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseInt(e.target.value) || 0);
        setPointsToUse(Math.min(value, availablePoints));
    };

    // 숫자 포맷팅 함수
    const formatPrice = (price: number) => {
        return price.toLocaleString("ko-KR");
    };

    //선택한 주소
    const getSelectedAddressText = () => {
        return selectedAddress
            ? `${selectedAddress.address} ${selectedAddress.extraAddr}`
            : "배송지를 선택해주세요.";
    };

    // 배송지 모달 핸들러
    const handleAddressModal = () => setIsAddressModalOpen((prev) => !prev);

    // 배송지 선택 핸들러
    const handleAddressSelect = (selectedAddr: AddressType) => {
        setSelectedAddress(selectedAddr);
    };

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
                            discountPrice={products[0].discountPrice}
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
                                            key={product.id} // ✅ key 추가
                                            title={product.title}
                                            price={product.price}
                                            discountPrice={
                                                product.discountPrice
                                            }
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
                        <span>{userData?.name}</span>
                    </div>
                    <div className={cx("infoRow")}>
                        <span>휴대폰</span>
                        <span>{userData?.phone}</span>
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
                                    key={`${addr.id}-${index}`}
                                    className={cx("addressItem", {
                                        selected:
                                            selectedAddress?.id === addr.id,
                                    })}
                                    onClick={() => handleAddressSelect(addr)}
                                >
                                    <Radio
                                        checked={
                                            selectedAddress?.id === addr.id
                                        }
                                        onChange={() =>
                                            handleAddressSelect(addr)
                                        }
                                        name="deliveryAddress"
                                        title={`${addr.address} ${addr.extraAddr}`}
                                        value={addr.id}
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
