export interface Discount {
  discountName: string;
  discountAmount: number;
  discountType: "won" | "percent"; // 할인 단위 (예제 기준으로 "won"만 있음)
  startAt: string;
  endAt: string;
}

export interface ProductInfo {
  seller: string;
  deliveryComp: string;
  deliveryInfo: string;
  packageType: string;
  packageDescription: string;
  productOrigin: string;
  extraDescription: string;
  expirationDate: string;
}

export interface Product {
  _id: string;
  productId: string;
  discount: Discount;
  info: ProductInfo;
  productName: string;
  description: string;
  orgPrice: number;
  finalPrice: number;
  canReward: boolean;
  amount: number;
  likeCnt: number;
  commentCnt: number;
  sellCnt: number;
  mainImgUrl: string;
  detailInfoHtml: any;
  updateAt: string;
  categories: object[]; // categories의 구조가 명확하지 않아 임시로 object[] 지정
  options: any[]; // 옵션의 타입이 명확하지 않아 any[]로 지정
  myLiked: boolean;
}

export type DetailProps = {
  data: Product;
  id: string;
};

export type ProductProps = {
  options: any;
  finalPrice: any;
  find(arg0: () => any): unknown;
  product: Product;
};
