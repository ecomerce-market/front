// src/app/main/collection/[id]/page.tsx

import Categorise from "./categoris";
import styles from "./page.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <div className={cx("page")}>
      <Categorise params={id} />
    </div>
  );
};

export default Page;
