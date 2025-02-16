// src/app/main/collection/[id]/page.tsx

import Categorise from "./categoris";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div>
      <Categorise params={id} />
    </div>
  );
};

export default Page;
