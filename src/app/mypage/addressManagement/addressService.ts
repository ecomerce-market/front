import { Address } from "./addressType";

// 공통 URL
const BASE_URL = "http://localhost:3001/api/v1";

// 토큰값 가져오기
const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error(ERROR_MESSAGES.TOKEN_MISSING);
    return token;
};

// 에러 메시지
const ERROR_MESSAGES = {
    E006: "주소를 찾을 수 없습니다.",
    E007: "기본 배송지는 삭제할 수 없습니다.",
    E009: "사용자 인증에 실패했습니다.",
    DELETE_FAIL: "배송지 삭제에 실패했습니다.",
    UPDATE_FAIL: "배송지 수정에 실패했습니다.",
    DEFAULT_UPDATE_FAIL: "기본배송지 설정에 실패했습니다.",
    ADD_FAIL: "배송지 추가에 실패했습니다.",
    TOKEN_MISSING: "사용자 인증에 실패했습니다.",
    HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
} as const;

// 에러 핸들링 함수
const handleApiError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();

        switch (response.status) {
            case 400:
                if (errorData.code === "E007")
                    throw new Error(ERROR_MESSAGES.E007);
                break;
            case 401:
                if (errorData.code === "E009")
                    throw new Error(ERROR_MESSAGES.E009);
                break;
            case 404:
                if (errorData.code === "E006")
                    throw new Error(ERROR_MESSAGES.E006);
                break;
            default:
                throw new Error(ERROR_MESSAGES.HTTP_ERROR(response.status));
        }
    }
};

//  API 목록
export const addressService = {
    //  사용자 주소 목록 조회
    fetchAddresses: async (): Promise<Address[]> => {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/users/addresses`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await handleApiError(response);
        const data = await response.json();

        if (data.message === "success") {
            return data.addresses.sort((a: Address, b: Address) =>
                b.defaultAddr === a.defaultAddr ? 0 : b.defaultAddr ? 1 : -1
            );
        }
        return [];
    },

    //  사용자 주소 추가
    addAddress: async (
        address: string,
        extraAddr: string,
        isDefault: boolean
    ): Promise<string> => {
        const token = getToken();
        const response = await fetch(`${BASE_URL}/users/addresses`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ address, extraAddr, isDefault }),
        });

        await handleApiError(response);
        const data = await response.json();

        if (data.message === "new address added success") {
            return data.addressId;
        }
        throw new Error(ERROR_MESSAGES.ADD_FAIL);
    },

    //  사용자 주소 수정
    updateAddress: async (
        addressId: string,
        address: string,
        extraAddr: string
    ): Promise<void> => {
        const token = getToken();
        const response = await fetch(
            `${BASE_URL}/users/addresses/${addressId}`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ address, extraAddr }),
            }
        );

        await handleApiError(response);
        const data = await response.json();

        if (data.message !== "update success") {
            throw new Error(ERROR_MESSAGES.UPDATE_FAIL);
        }
    },

    //  기본 주소 설정
    setDefaultAddress: async (addressId: string): Promise<void> => {
        const token = getToken();
        const response = await fetch(
            `${BASE_URL}/users/addresses/${addressId}/defaults`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        await handleApiError(response);
        const data = await response.json();

        if (data.message !== "update success") {
            throw new Error(ERROR_MESSAGES.DEFAULT_UPDATE_FAIL);
        }
    },

    //  사용자 주소 삭제
    deleteAddress: async (addressId: string): Promise<void> => {
        const token = getToken();
        const response = await fetch(
            `${BASE_URL}/users/addresses/${addressId}`,
            {
                method: "DELETE",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        await handleApiError(response);
        const data = await response.json();

        if (data.message !== "delete success") {
            throw new Error(ERROR_MESSAGES.DELETE_FAIL);
        }
    },
};
