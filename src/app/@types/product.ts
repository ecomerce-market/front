export type DetailType = {
  discount: {
    discountAmount: string;
    discountType: string;
  };
  description: string;
  productName: string;
  orgPrice: string;
  finalPrice: string;
  mainImgUrl: string;
  info: {
    deliveryComp: string;
    deliveryInfo: string;
    packageType: string;
    productOrigin: string;
    seller: string;
  };
};

export type ProductDetailProps = {
  imgSrc: string;
  productName: string[];
  mainTitle: string;
  subTitle: string;
  discountRate: string;
  discountType: string;
  discountPrice: string;
  originPrice: string;
  subsubTitle?: string;
  productData: DetailType;
  info: {
    deliveryComp: string;
    deliveryInfo: string;
    packageType: string;
    productOrigin: string;
    seller: string;
  };
};
