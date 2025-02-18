import cn from "classnames/bind";
import styles from "./order.module.scss";
import React from "react";
import Image from "next/image";
import OneBtn from "@/components/btn/oneBtn";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";

const cx = cn.bind(styles);

interface OrderProductCardProps {
    date: string;
    title: string;
    orderNumber: string;
    payMethod: string;
    price: number;
    complete: boolean;
    imageUrl?: string;
    totalProductCnt: number;
    onClick?: () => void;
}

const OrderProductCard: React.FC<OrderProductCardProps> = ({
    date,
    title,
    orderNumber,
    payMethod,
    price,
    complete,
    imageUrl = "/images/example.png",
    totalProductCnt,
    onClick,
}) => {
    const displayTitle =
        totalProductCnt > 1 ? `${title} 외 ${totalProductCnt - 1}개` : title;

    return (
        <div className={cx("orderWrapper")}>
            <div className={cx("showMore")}>
                <p>{date}</p>
                <Link href={`/mypage/orderList/orderDetail/${orderNumber}`}>
                    <p>
                        주문내역 상세보기
                        <FaAngleRight />
                    </p>
                </Link>
            </div>
            <div className={cx("orderMain")}>
                <div className={cx("productDetail")}>
                    <Image width={70} height={86} src={imageUrl} alt={title} />
                    <div className={cx("infoDetail")}>
                        <div>
                            <p>상품명</p>
                            <p>{displayTitle}</p>
                        </div>
                        <div>
                            <p>주문번호</p>
                            <p>{orderNumber}</p>
                        </div>
                        <div>
                            <p>결제방법</p>
                            <p>{payMethod}</p>
                        </div>
                        <div>
                            <p>결제금액</p>
                            <p>{price.toLocaleString()}원</p>
                        </div>
                    </div>
                </div>
                <div className={cx("productDetail")}>
                    <p>{complete ? "배송완료" : "배송중"}</p>
                    <Link href={`/inquiry/inquiryDetail/${orderNumber}`}>
                        <OneBtn
                            onClick={onClick}
                            title={"1:1 문의"}
                            width={"100"}
                            height={"28"}
                            fontSize={"13"}
                            padding="12px 15px"
                            color="--main-color"
                            border="--main-color"
                            borderSize="2"
                            bgcolor="--white"
                            fontWeight="600"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderProductCard;
