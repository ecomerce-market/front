import Detail from "./detail";

const ProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Detail params={params} />
    </div>
  );
};

export default ProductPage;
