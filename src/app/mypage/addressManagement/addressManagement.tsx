"use client";
import React, { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import PersonalInfo from "@/components/personalnfo/personalInfo";
import SideMenu from "@/components/sideMenu/sideMenu";
import Radio from "@/components/radio/radio";
import { AddressSearchModal, DetailAddressModal } from "./addressModal";
import { addressService } from "./addressService";
import { Address, SelectedAddress } from "./addressType";
import styles from "./addressManagement.module.scss";
import cn from "classnames/bind";
import Popup from "@/components/popup/popup";

const cx = cn.bind(styles);

const AddressManagement = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [error, setError] = useState("");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<SelectedAddress>({
        address: "",
        extraAddr: "",
        zonecode: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState("");
    const [currentDetailAddress, setCurrentDetailAddress] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{
        addressId: string;
        isDefault: boolean;
    } | null>(null);

    // 사용자 모든 배송지 가져오기
    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const fetchedAddresses = await addressService.fetchAddresses();
            setAddresses(fetchedAddresses);
            setError("");
        } catch (err) {
            setError("주소 목록을 불러오는데 실패했습니다.");
            console.error(err);
        }
    };

    // 주소 선택 완료 시 상세 주소 입력 모달로 전환
    const handleAddressComplete = (data: any) => {
        setSelectedAddress({
            address: data.address,
            zonecode: data.zonecode,
            extraAddr: data.extraAddr,
        });
        setIsAddressModalOpen(false);
        setIsDetailModalOpen(true);
    };

    // 상세 주소 입력
    // 수정인지 추가인지 확인 / 첫번째 주소는 기본배송지로 설정

    const handleDetailSubmit = async (detailAddress: string) => {
        try {
            if (isEditMode) {
                await addressService.updateAddress(
                    editingAddressId,
                    selectedAddress.address,
                    detailAddress
                );
            } else {
                await addressService.addAddress(
                    selectedAddress.address,
                    detailAddress,
                    addresses.length === 0
                );
            }
            await loadAddresses();
            resetModals();
        } catch (err: any) {
            setError(err.message || "주소 처리 중 오류가 발생했습니다.");
        }
    };

    // 기본 배송지 변경
    const handleRadioChange = async (addressId: string) => {
        try {
            console.log("Setting default address:", addressId);
            await addressService.setDefaultAddress(addressId);
            console.log("Default address set successfully");
            await loadAddresses();
            console.log("Addresses reloaded");
        } catch (err) {
            console.error("Error in handleRadioChange:", err);
            setError("기본 배송지 설정에 실패했습니다.");
        }
    };

    // 배송지 수정
    const handleEditClick = (address: Address) => {
        setIsEditMode(true);
        setEditingAddressId(address.addressId);
        setSelectedAddress({
            address: address.address,
            zonecode: "",
            extraAddr: address.extraAddr,
        });
        setCurrentDetailAddress(address.extraAddr);
        setIsDetailModalOpen(true);
    };

    // 기본 배송지는 삭제 불가
    const handleDeleteClick = (addressId: string, isDefault: boolean) => {
        if (isDefault) {
            alert("기본 배송지는 삭제할 수 없습니다.");
            return;
        }
        setDeleteTarget({ addressId, isDefault });
        setIsPopupOpen(true);
    };

    // 실제 삭제 처리
    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;

        try {
            await addressService.deleteAddress(deleteTarget.addressId);
            await loadAddresses();
            setIsPopupOpen(false);
            setDeleteTarget(null);
        } catch (err: any) {
            setError(err.message || "주소 삭제에 실패했습니다.");
        }
    };

    // 팝업 닫기
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setDeleteTarget(null);
    };

    // 모달 관련 상태 초기화
    const resetModals = () => {
        setIsAddressModalOpen(false);
        setIsDetailModalOpen(false);
        setSelectedAddress({ address: "", zonecode: "", extraAddr: "" });
        setIsEditMode(false);
        setEditingAddressId("");
        setCurrentDetailAddress("");
    };

    return (
        <div className={cx("addressManagementWrapper")}>
            <PersonalInfo />
            <div className={cx("myInfoMain")}>
                <div className={cx("sideMenu")}>
                    <SideMenu title={"마이컬리"} />
                </div>
                {/* 제목 */}
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
                    {/* 배송지 목록 */}
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
                    {/* 에러메세지 */}
                    {error && <div className={cx("errorMessage")}>{error}</div>}
                </div>
            </div>

            {/* 주소 검색 팝업 */}
            <AddressSearchModal
                isOpen={isAddressModalOpen}
                onClose={resetModals}
                onComplete={handleAddressComplete}
                theme={{ bgColor: "#EAF8F4" }}
            />

            {/* 상세 주소 입력 팝업 */}
            <DetailAddressModal
                isOpen={isDetailModalOpen}
                onClose={resetModals}
                selectedAddress={selectedAddress}
                onSubmit={handleDetailSubmit}
                isEditMode={isEditMode}
                initialDetailAddress={currentDetailAddress}
            />

            {/* 삭제 팝업 */}
            {isPopupOpen && (
                <div className={cx("popupWrapper")}>
                    <Popup
                        isOpen={isPopupOpen}
                        title="배송지를 삭제하시겠습니까?"
                        leftBtn="취소"
                        rightBtn="삭제"
                        onClose={handleClosePopup}
                        onRightBtnClick={() => handleConfirmDelete()}
                    />
                </div>
            )}
        </div>
    );
};

export default AddressManagement;
