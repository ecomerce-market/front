import { DetailProps } from "@/app/@types/product";
import ProductInfoList from "@/components/main/product/productInfoList/productInfoList";
import ProductDetail from "@/components/productCard/productDetail/productDetail";

const Detail = ({ id, data }: DetailProps) => {
  console.log(data);
  return (
    <div>
      <ProductDetail id={id} data={data} />
      <ProductInfoList
        detailInfoHtml={data.detailInfoHtml}
        likeCnt={data.likeCnt}
      />
    </div>
  );
};

export default Detail;
{
}
