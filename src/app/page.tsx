import DetailProductCard from "@/components/product/detail/product";

export default function Home() {
  return (
    <div>
      <DetailProductCard
        title={"[올레길] 제주 슈레드 모짜렐라 치즈 (100 X 3입)"}
        price={"9,300원"}
        discountPrice={"8,100원"}
        count={"1개"}
        complete={true}
      />
    </div>
  );
}
