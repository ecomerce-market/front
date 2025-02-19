import Detail from "./detail";
//ssr연결 해봄
const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const res = await fetch(`http://localhost:3001/api/v1/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("상품 데이터를 불러오는 데 실패했습니다.");
    }

    const data = await res.json();
    return (
      <div>
        <Detail id={id} data={data.product} />
      </div>
    );
  } catch (error) {
    console.error("상품 데이터 패칭 실패", error);
    return <div>상품 정보를 불러오는 데 실패했습니다.</div>;
  }
};

export default ProductPage;
