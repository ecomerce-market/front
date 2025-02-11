// src/app/main/collection/[id]/page.tsx

import Categorise from "./categoris";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Categorise params={params.id} />
    </div>
  );
};

export default Page;
