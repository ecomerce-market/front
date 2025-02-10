import Categorise from "./categoris";

type CategoryPageProps = {
  params: { id: string };
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  return (
    <div>
      <Categorise params={params.id} /> {/* params 객체 전체를 전달 */}
    </div>
  );
};

export default CategoryPage;
