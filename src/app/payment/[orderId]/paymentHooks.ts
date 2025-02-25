// hooks.ts
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    UserDataType,
    AddressType,
    OrderType,
    OrderUpdateData,
    Calculations,
} from "./paymentType";
import * as API from "./paymentService";

const DEFAULT_ORDER: OrderType = {
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
};

export const usePayment = (orderId: string) => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [addresses, setAddresses] = useState<AddressType[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderType>(DEFAULT_ORDER);
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

    // API 호출 함수들 - 컴포넌트에서 사용할 수 있도록 래핑
    const onFetchUserData = async () => API.fetchUserData();
    const onFetchAddresses = async () => API.fetchAddresses();
    const onFetchOrderDetails = async () => API.fetchOrderDetails(orderId);
    const onUpdateOrder = async (updateData: OrderUpdateData) =>
        API.updateOrder(orderId, updateData);
    const onApproveOrder = async () => API.approveOrder(orderId);

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
    }, [orderId]);

    // 가격 계산 로직
    const calculations = useMemo<Calculations>(() => {
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
            setIsApproving(false);
        }
    };

    // 리턴할 데이터와 함수들
    return {
        userData,
        addresses,
        orderDetails,
        selectedAddress,
        isLoading,
        isExpanded,
        pointsToUse,
        isAddressModalOpen,
        error,
        isUpdating,
        isApproving,
        selectedPaymentMethod,
        calculations,
        formatPrice,
        getSelectedAddressText,
        setIsExpanded,
        handleAddressModal,
        handleAddressSelect,
        handlePaymentMethodSelect,
        handleApproveOrder,
        onFetchUserData,
        onFetchAddresses,
        onFetchOrderDetails,
        onUpdateOrder,
        onApproveOrder,
    };
};
