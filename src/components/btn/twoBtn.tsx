import { ReactNode } from "react";
import OneBtn from "./oneBtn";
import Link from "next/link";

interface TwoBtnPros {
    leftTitle: ReactNode;
    rightTitle: ReactNode;
    leftOnClick?: () => void;
    rightOnClick?: () => void;
    leftIcon?: string;
    rightIcon?: string;
    leftColor?: string;
    rightColor?: string;
    leftBgColor: string;
    rightBgColor: string;
    leftBorder: string;
    rightBorder: string;
    leftLink?: string;
    rightLink?: string;
}

const TwoBtn: React.FC<TwoBtnPros> = ({
    leftTitle,
    rightTitle,
    leftOnClick,
    rightOnClick,
    leftBgColor,
    rightBgColor,
    leftIcon,
    rightIcon,
    leftBorder,
    rightBorder,
    leftLink = "#",
    rightLink = "#",
}) => {
    return (
        <div
            style={{
                width: "320px",
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
            }}
        >
            <Link href={leftLink}>
                <OneBtn
                    icon={leftIcon}
                    title={leftTitle}
                    width={"155"}
                    bgcolor={leftBgColor}
                    onClick={leftOnClick}
                    borderSize="1"
                    border={leftBorder}
                    height={"47"}
                    color="--black"
                    fontWeight="bold"
                />
            </Link>
            <Link href={rightLink}>
                <OneBtn
                    title={rightTitle}
                    icon={rightIcon}
                    width={"155"}
                    bgcolor={rightBgColor}
                    onClick={rightOnClick}
                    borderSize="1"
                    border={rightBorder}
                    height={"47"}
                    color="--white"
                    fontWeight="bold"
                />
            </Link>
        </div>
    );
};

export default TwoBtn;
