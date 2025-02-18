import { DetailProps } from "@/app/@types/product";
import ProductDetail from "@/components/productCard/productDetail/productDetail";

const Detail = ({ data }: DetailProps) => {
  return (
    <div>
      <ProductDetail data={data} />
    </div>
  );
};

export default Detail;

{
  /* <ProductInfoList
          detailInfoHtml={data.detailInfoHtml}
          commentCnt={data.commentCnt}
        /> */
}
