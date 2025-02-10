"use client";
import React, { useState, useEffect } from "react";
import styles from "./addressManagement.module.scss";
import cn from "classnames/bind";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import Radio from "@/components/radio/radio";
import DaumPostcode from "react-daum-postcode";
import OneBtn from "@/components/btn/oneBtn";
import TextInput from "@/components/input/textInput";
import { FiXCircle } from "react-icons/fi";

const cx = cn.bind(styles);

const AddressManagement = () => {
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        address: "",
        zonecode: "",
    });
    const [detailAddress, setDetailAddress] = useState("");
    const [addresses, setAddresses] = useState<
        { address: string; zonecode: string }[]
    >([]);
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

    const themeObj = {
        bgColor: "#EAF8F4",
    };

    // 주소 불러오기
    useEffect(() => {
        const savedAddresses = localStorage.getItem("addresses");
        const savedSelectedRadio = localStorage.getItem("selectedRadio");

        if (savedAddresses) {
            setAddresses(JSON.parse(savedAddresses));
        }
        if (savedSelectedRadio) {
            setSelectedRadio(savedSelectedRadio);
        }
    }, []);

    // 주소 검색 완료 시 화면에 뿌려주기
    const handleComplete = (data: any) => {
        setSelectedAddress({
            address: data.address,
            zonecode: data.zonecode,
        });
        setIsAddressModalOpen(false);
        setIsDetailModalOpen(true);
    };

    // 상세 주소 입력 시 화면에 뿌려주기
    const handleDetailSubmit = () => {
        if (!selectedAddress.address || !detailAddress) return;

        const newAddress = {
            address: `${selectedAddress.address} ${detailAddress}`,
            zonecode: selectedAddress.zonecode,
        };

        const newAddresses = [newAddress, ...addresses];
        setAddresses(newAddresses);
        setSelectedRadio("0");
        saveToLocalStorage(newAddresses, "0");

        setIsDetailModalOpen(false);
        setDetailAddress("");
    };

    // 라디오 버튼 클릭 시 기본 배송지 변경
    const handleRadioChange = (value: string) => {
        const selectedIndex = parseInt(value);
        const selectedItem = addresses[selectedIndex];
        const otherAddresses = addresses.filter(
            (_, index) => index !== selectedIndex
        );
        const reorderedAddresses = [selectedItem, ...otherAddresses];

        setAddresses(reorderedAddresses);
        setSelectedRadio("0");
        saveToLocalStorage(reorderedAddresses, "0");
    };

    // 로컬스토리지에 주소 저장 (임시)
    const saveToLocalStorage = (
        updatedAddresses: { address: string; zonecode: string }[],
        selectedValue: string
    ) => {
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
        localStorage.setItem("selectedRadio", selectedValue);
    };

    return (
        <div className={cx("addressManagementWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu
                        title={"마이컬리"}
                        content={[
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
                <div className={cx("addressSection")}>
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
                        {addresses.map((addr, index) => (
                            <div
                                key={`${addr.address}-${index}`}
                                className={cx("addressItem")}
                            >
                                <Radio
                                    title={`${addr.address} (${addr.zonecode})`}
                                    name="deliveryAddress"
                                    value={String(index)}
                                    checked={selectedRadio === String(index)}
                                    onChange={handleRadioChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 주소 검색 팝업 */}
            {isAddressModalOpen && (
                <div className={cx("modalOverlay")}>
                    <div className={cx("modalContent")}>
                        <div className={cx("modalHeader")}>
                            <h2>주소 검색</h2>
                            <button
                                onClick={() => setIsAddressModalOpen(false)}
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

            {/* 상세 주소 입력 팝업 */}
            {isDetailModalOpen && (
                <div className={cx("modalOverlay")}>
                    <div className={cx("modalContent")}>
                        <div className={cx("modalHeader")}>
                            <h2>상세 주소 입력</h2>
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
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
                                    onChange={(e) =>
                                        setDetailAddress(e.target.value)
                                    }
                                />
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
