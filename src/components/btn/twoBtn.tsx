import { ReactNode } from "react";
import OneBtn from "./oneBtn";

interface TwoBtnPros {
  leftTitle: ReactNode;
  rightTitle: ReactNode;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
  leftBgColor: string;
  rightBgColor: string;
  leftBorder: string;
  rightBorder: string;
}

const TwoBtn: React.FC<TwoBtnPros> = ({
  leftTitle,
  rightTitle,
  leftOnClick,
  rightOnClick,
  leftBgColor,
  rightBgColor,
  leftBorder,
  rightBorder,
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
      <OneBtn
        title={leftTitle}
        width={"155"}
        bgcolor={leftBgColor}
        onClick={leftOnClick}
        borderSize="1"
        border={leftBorder}
        height={"47"}
        fontWeight="bold"
      />
      <OneBtn
        title={rightTitle}
        width={"155"}
        bgcolor={rightBgColor}
        onClick={rightOnClick}
        borderSize="1"
        border={rightBorder}
        height={"47"}
        color="--white"
        fontWeight="bold"
      />
    </div>
  );
};

export default TwoBtn;
