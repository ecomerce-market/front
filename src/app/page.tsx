import ReviewCard from "@/components/productCard/review/reviewCard";

export default function Home() {
  return (
    <div>
      <ReviewCard
        lateDate="7"
        title={"감자 2KG"}
        discountRate={20}
        price={"32100"}
        discountPrice={"30000"}
        purchase={1}
        btntitle={"후기 작성하기"}
        btnwidth={"155"}
        btnHeight={"47"}
      />
    </div>
  );
}
