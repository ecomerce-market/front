import { DetailProps } from "@/app/@types/product";
import ProductInfoList from "@/components/main/product/productInfoList/productInfoList";
import ProductDetail from "@/components/productCard/productDetail/productDetail";

const Detail = ({ id, data }: DetailProps) => {
  return (
    <div>
      <ProductDetail id={id} data={data} />
    </div>
  );
};

export default Detail;
{
  /* <ProductInfoList />; */
}
