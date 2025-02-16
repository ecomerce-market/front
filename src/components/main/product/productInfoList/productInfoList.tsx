import { DetailType } from "@/app/@types/product";
import ListBar from "./listBar";

export type InfoType = Pick<DetailType, "detailInfoHtml" | "commentCnt">;

const productInfoList = ({ commentCnt, detailInfoHtml }: InfoType) => {
  return (
    <div>
      <ListBar detailInfoHtml={detailInfoHtml} commentCnt={commentCnt} />
    </div>
  );
};

export default productInfoList;
