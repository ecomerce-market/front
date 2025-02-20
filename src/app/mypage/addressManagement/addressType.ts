// 배송지 정보 타입
export interface Address {
    addressId: string;
    address: string;
    extraAddr: string;
    defaultAddr: boolean;
}

// 주소 검색 타입
export interface SelectedAddress {
    address: string;
    zonecode: string;
    extraAddr: string;
}

// 주소 검색 모달
export interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onComplete: (data: any) => void;
    theme?: {
        bgColor: string;
    };
}

// 상세 주소 입력 타입
export interface DetailAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAddress: SelectedAddress;
    initialDetailAddress?: string;
    onSubmit: (detailAddress: string) => void;
    isEditMode?: boolean;
}
export interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
