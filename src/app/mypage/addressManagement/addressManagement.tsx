"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./addressManagement.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import Radio from "@/components/radio/radio";
import DaumPostcode from "react-daum-postcode";
import OneBtn from "@/components/btn/oneBtn";
import TextInput from "@/components/input/textInput";
import { FiXCircle } from "react-icons/fi";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const cx = cn.bind(styles);

interface Address {
    addressId: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

const AddressManagement = () => {
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<string>("");
    const [selectedAddress, setSelectedAddress] = useState({
        address: "",
        zonecode: "",
    });
    const [detailAddress, setDetailAddress] = useState("");
    const [detailAddressError, setDetailAddressError] = useState("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [error, setError] = useState<string>("");
    const addressSectionRef = useRef<HTMLDivElement>(null);
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

    const themeObj = {
        bgColor: "#EAF8F4",
    };

    // 사용자 주소 목록 조회
    const fetchAddresses = async () => {
        const url = `http://localhost:3001/api/v1/users/addresses`;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `HTTP error! status: ${response.status}, body: ${errorText}`
                );
            }

            const data = await response.json();
            if (data.message === "success") {
                const sortedAddresses = [...data.addresses].sort((a, b) =>
                    b.defaultAddr === a.defaultAddr ? 0 : b.defaultAddr ? 1 : -1
                );
                setAddresses(sortedAddresses);
                setError("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // 사용자 주소 추가
    const addNewAddress = async (address: string, extraAddr: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return false;
            }
            const response = await fetch(
                `http://localhost:3001/api/v1/users/addresses`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        address,
                        extraAddr,
                        isDefault: addresses.length === 0,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(`status: ${response.status}`);
            }
            const data = await response.json();

            if (data.message === "new address added success") {
                const newAddress = {
                    addressId: data.addressId,
                    address: address,
                    extraAddr: extraAddr,
                    defaultAddr: addresses.length === 0,
                };

                setAddresses((prev) => {
                    const updatedAddresses = [...prev];
                    if (updatedAddresses.length === 0) {
                        updatedAddresses.unshift(newAddress);
                    } else {
                        updatedAddresses.push(newAddress);
                    }
                    return updatedAddresses;
                });

                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            setError("새 주소를 추가하는데 실패했습니다.");
            return false;
        }
    };

    // 사용자 주소 기본 주소로 설정
    const setDefaultAddress = async (addressId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("토큰값이 없습니다.");
            }

            const response = await fetch(
                `http://localhost:3001/api/v1/users/addresses/${addressId}/defaults`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(` error${response.status},  ${errorText}`);
            }

            const data = await response.json();
            if (data.message === "success") {
                const updatedAddresses = [...addresses];
                const selectedAddrIndex = updatedAddresses.findIndex(
                    (addr) => addr.addressId === addressId
                );
                if (selectedAddrIndex !== -1) {
                    updatedAddresses.forEach((addr) => {
                        addr.defaultAddr = addr.addressId === addressId;
                    });
                    const [selectedAddr] = updatedAddresses.splice(
                        selectedAddrIndex,
                        1
                    );
                    updatedAddresses.unshift(selectedAddr);

                    setAddresses(updatedAddresses);
                }
                setError("");
            }
        } catch (error) {
            console.error("Failed to set default address:", error);
            setError("기본 배송지 설정에 실패했습니다.");
        }
    };

    const handleRadioChange = async (addressId: string) => {
        setSelectedRadio(addressId);
        await setDefaultAddress(addressId);
        await fetchAddresses();
    };

    const handleDetailSubmit = async () => {
        if (!detailAddress.trim()) {
            setDetailAddressError("상세주소를 입력해주세요");
            return;
        }

        setDetailAddressError("");
        try {
            let success;
            if (isEditMode) {
                success = await updateAddress(
                    editingAddressId,
                    selectedAddress.address,
                    detailAddress
                );
            } else {
                success = await addNewAddress(
                    selectedAddress.address,
                    detailAddress
                );
            }

            if (success) {
                resetModals();
            } else {
                setError(
                    isEditMode
                        ? "주소 수정에 실패했습니다."
                        : "주소 추가에 실패했습니다."
                );
            }
        } catch (error) {
            console.error(error);
            setError(
                isEditMode
                    ? "주소 수정 중 오류가 발생했습니다."
                    : "주소 추가 중 오류가 발생했습니다."
            );
        }
    };
    const handleEditClick = async (address: Address) => {
        setIsEditMode(true);
        setEditingAddressId(address.addressId);
        setSelectedAddress({
            address: address.address,
            zonecode: "",
        });
        setDetailAddress(address.extraAddr);
        setIsDetailModalOpen(true);
    };

    // 주소 수정
    const updateAddress = async (
        addressId: string,
        address: string,
        extraAddr: string
    ) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return false;

            const response = await fetch(
                `http://localhost:3001/api/v1/users/addresses/${addressId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        address,
                        extraAddr,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.code === "E008") {
                    alert("기본 배송지는 반드시 존재해야 합니다.");
                    return false;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.message === "update success") {
                await fetchAddresses();
                return true;
            }

            return false;
        } catch (error) {
            console.error("Failed to update address:", error);
            setError("주소 수정에 실패했습니다.");
            return false;
        }
    };
    const handleComplete = (data: any) => {
        setSelectedAddress({
            address: data.address,
            zonecode: data.zonecode,
        });
        setIsAddressModalOpen(false);
        setIsDetailModalOpen(true);
        setDetailAddressError("");
    };
    const resetModals = () => {
        setIsAddressModalOpen(false);
        setIsDetailModalOpen(false);
        setDetailAddress("");
        setSelectedAddress({ address: "", zonecode: "" });
        setIsEditMode(false);
        setEditingAddressId("");
    };

    // 주소 삭제
    const deleteAddress = async (addressId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token is missing.");
            }

            const response = await fetch(
                `http://localhost:3001/api/v1/users/addresses/${addressId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 400) {
                const errorData = await response.json();
                if (errorData.code === "E007") {
                    setError("기본 배송지는 삭제할 수 없습니다.");
                    return;
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.message === "delete success") {
                setAddresses((prevAddresses) =>
                    prevAddresses.filter((addr) => addr.addressId !== addressId)
                );
                setError("");
            }
        } catch (error) {
            console.error("Failed to delete address:", error);
            setError("주소 삭제에 실패했습니다.");
        }
    };

    const handleDeleteClick = async (addressId: string, isDefault: boolean) => {
        if (isDefault) {
            alert("기본 배송지는 삭제할 수 없습니다.");
            return;
        }
        await deleteAddress(addressId);
    };

    return (
        <div className={cx("addressManagementWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
                            { label: "개인정보 수정", path: "/mypage/myInfo" },
                            { label: "주문내역", path: "/mypage/orderList" },
                            { label: "찜한상품", path: "/mypage/wishList" },
                            {
                                label: "배송지 관리",
                                path: "/mypage/addressManagement",
                            },
                            { label: "상품 후기", path: "/mypage/review" },
                        ]}
                    />
                </div>
                <div className={cx("addressSection")} ref={addressSectionRef}>
                    {error && <div className={cx("errorMessage")}>{error}</div>}
                    <div className={cx("addressHeader")}>
                        <div className={cx("addressItem")}>
                            <h1 className={cx("mainTitle")}>배송지 관리</h1>
                            <p className={cx("subTitle")}>
                                배송지에 따라 상품정보 및 배송유형이 달라질 수
                                있습니다.
                            </p>
                        </div>
                        <p
                            className={cx("content")}
                            onClick={() => setIsAddressModalOpen(true)}
                            style={{ cursor: "pointer" }}
                        >
                            + 새 배송지 추가
                        </p>
                    </div>

                    <div className={cx("submitForm")}>
                        <p className={cx("mainAddress")}>기본 배송지</p>
                        {addresses.map((addr) => (
                            <div
                                key={addr.addressId}
                                className={cx("addressItem")}
                            >
                                <Radio
                                    title={`${addr.address} ${addr.extraAddr}`}
                                    name="deliveryAddress"
                                    value={addr.addressId}
                                    checked={addr.defaultAddr}
                                    onChange={() =>
                                        handleRadioChange(addr.addressId)
                                    }
                                />
                                <div className={cx("addressIcon")}>
                                    <div
                                        onClick={() => handleEditClick(addr)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaPencil />
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleDeleteClick(
                                                addr.addressId,
                                                addr.defaultAddr
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaTrashAlt />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isAddressModalOpen && (
                <div className={cx("modalOverlay")} onClick={resetModals}>
                    <div
                        className={cx("modalContent")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cx("modalHeader")}>
                            <h2>주소 검색</h2>
                            <button
                                onClick={resetModals}
                                className={cx("closeButton")}
                            >
                                <FiXCircle />
                            </button>
                        </div>
                        <DaumPostcode
                            onComplete={handleComplete}
                            autoClose={false}
                            style={{ height: 500 }}
                            theme={themeObj}
                        />
                    </div>
                </div>
            )}

            {isDetailModalOpen && (
                <div className={cx("modalOverlay")} onClick={resetModals}>
                    <div
                        className={cx("modalContent")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cx("modalHeader")}>
                            <h2>상세 주소 입력</h2>
                            <button
                                onClick={resetModals}
                                className={cx("closeButton")}
                            >
                                <FiXCircle />
                            </button>
                        </div>
                        <div className={cx("detailAddressForm")}>
                            <div className={cx("addressInfo")}>
                                <p>우편번호: {selectedAddress.zonecode}</p>
                                <p>주소: {selectedAddress.address}</p>
                            </div>
                            <div className={cx("detailInputWrapper")}>
                                <TextInput
                                    width="450"
                                    height="40"
                                    value={detailAddress}
                                    onChange={(e) => {
                                        setDetailAddress(e.target.value);
                                        setDetailAddressError("");
                                    }}
                                />
                                {detailAddressError && (
                                    <p className={cx("errorMessage")}>
                                        {detailAddressError}
                                    </p>
                                )}
                                <div className={cx("submitButton")}>
                                    <OneBtn
                                        title="저장"
                                        width="320"
                                        height="42"
                                        onClick={handleDetailSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressManagement;
