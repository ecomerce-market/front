import React from "react";
import styles from "./complete.module.scss";
import cn from "classnames/bind";
import { PiCheckCircle } from "react-icons/pi";
import TwoBtn from "@/components/btn/twoBtn";

const cx = cn.bind(styles);

const OrderComplete = ({ amount = 9000, points = 900 }) => {
    return (
        <div className={cx("paymentDetails")}>
            <div className={cx("orderComplete")}>
                <div className={cx("checkIcon")}>
                    <PiCheckCircle />
                </div>
                <p>주문이 완료되었습니다.</p>
            </div>

            <div className={cx("orderInfo")}>
                <div className={cx("orderInfoTitle")}>
                    <p>결제 금액</p>
                    <p>{amount.toLocaleString()}원</p>
                </div>
                <div className={cx("orderInfoTitle")}>
                    <p>적립금</p>
                    <div className={cx("point")}>
                        <p>{points.toLocaleString()}원</p>
                        <p className={cx("pointInfo")}>
                            적립금은 배송 다음날 적립됩니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className={cx("buttonGroup")}>
                <TwoBtn
                    leftLink="/orderList/orderDetail"
                    rightLink="/main"
                    leftTitle={"주문 상세 보기"}
                    rightTitle={"쇼핑 계속하기"}
                    leftBgColor={"--white"}
                    rightBgColor={"--main-color"}
                    leftBorder={"--black-200"}
                    rightBorder={"--main-color"}
                />
            </div>
        </div>
    );
};

export default OrderComplete;
