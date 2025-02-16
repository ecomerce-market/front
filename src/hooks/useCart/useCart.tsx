/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PopupItems } from "@/app/@types/product";

// 장바구니 및 팝업 관련 훅
export const useCart = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PopupItems | null>(
    null
  );
  const router = useRouter();

  // 상품을 장바구니에 추가하는 함수
  const handleAddToCart = (product: PopupItems) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  // 팝업 닫기 함수
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // 팝업에서 "확인" 버튼 클릭 시 장바구니 추가 함수
  const handleRightBtnClick = (product: PopupItems) => {
    alert(`${product.name}이(가) 장바구니에 추가 되었습니다.`);
    setShowPopup(false);
  };

  // 상품 상세 페이지로 이동하는 함수
  const handleDetail = (product: any) => {
    const detailId = product.productId;
    router.push(`/product/${detailId}`);
  };

  return {
    showPopup,
    selectedProduct,
    handleAddToCart,
    handlePopupClose,
    handleRightBtnClick,
    handleDetail,
  };
};
