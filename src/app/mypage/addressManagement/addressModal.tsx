"use client";
import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { FiXCircle } from "react-icons/fi";
import TextInput from "@/components/input/textInput";
import OneBtn from "@/components/btn/oneBtn";
import { AddressModalProps, DetailAddressModalProps } from "./addressType";
import styles from "./addressManagement.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

// AddressSearchModal 컴포넌트
export const AddressSearchModal: React.FC<AddressModalProps> = ({
    isOpen,
    onClose,
    onComplete,
    theme = { bgColor: "#EAF8F4" },
}) => {
    if (!isOpen) return null;

    return (
        <div className={cx("modalOverlay")} onClick={onClose}>
            <div
                className={cx("modalContent")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cx("modalHeader")}>
                    <h2>주소 검색</h2>
                    <button onClick={onClose} className={cx("closeButton")}>
                        <FiXCircle />
                    </button>
                </div>
                <DaumPostcode
                    onComplete={onComplete}
                    autoClose={false}
                    style={{ height: 500 }}
                    theme={theme}
                />
            </div>
        </div>
    );
};
// DetailAddressModal 컴포넌트
export const DetailAddressModal: React.FC<DetailAddressModalProps> = ({
    isOpen,
    onClose,
    selectedAddress,
    initialDetailAddress = "",
    onSubmit,
    isEditMode = false,
}) => {
    const [detailAddress, setDetailAddress] = useState(initialDetailAddress);
    const [error, setError] = useState("");

    // 모달 오픈 시 이전 상세주소 호출
    useEffect(() => {
        if (isOpen) {
            setDetailAddress(initialDetailAddress);
        } else {
            setDetailAddress("");
        }
    }, [isOpen, initialDetailAddress]);

    if (!isOpen) return null;

    // 폼 제출
    const handleSubmit = () => {
        if (!detailAddress.trim()) {
            setError("상세주소를 입력해주세요");
            return;
        }
        onSubmit(detailAddress);
    };

    return (
        <div className={cx("modalOverlay")} onClick={onClose}>
            <div
                className={cx("modalContent")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cx("modalHeader")}>
                    <h2>상세 주소 입력</h2>
                    <button onClick={onClose} className={cx("closeButton")}>
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
                                setError("");
                            }}
                        />
                        {error && <p className={cx("errorMessage")}>{error}</p>}
                        <div className={cx("submitButton")}>
                            <OneBtn
                                title="저장"
                                width="320"
                                height="42"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className={cx("modalOverlay")} onClick={onClose}>
            <div
                className={cx("modalContent", "deleteConfirmModal")}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={cx("modalHeader")}>
                    <h2>배송지 삭제</h2>
                    <button onClick={onClose} className={cx("closeButton")}>
                        <FiXCircle />
                    </button>
                </div>
                <div className={cx("deleteConfirmContent")}>
                    <p>배송지를 삭제하시겠습니까?</p>
                    <div className={cx("buttonWrapper")}>
                        <OneBtn
                            title="취소"
                            width="150"
                            height="42"
                            onClick={onClose}
                        />
                        <OneBtn
                            title="삭제"
                            width="150"
                            height="42"
                            onClick={onConfirm}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
