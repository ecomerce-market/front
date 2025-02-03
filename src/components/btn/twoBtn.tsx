import OneBtn from "./oneBtn";

interface TwoBtnPros {
  leftTitle: string;
  rightTitle: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
  leftBgColor: string;
  rightBgColor: string;
}

const TwoBtn: React.FC<TwoBtnPros> = ({
  leftTitle,
  rightTitle,
  leftOnClick,
  rightOnClick,
  leftBgColor,
  rightBgColor,
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
      />
      <OneBtn
        title={rightTitle}
        width={"155"}
        bgcolor={rightBgColor}
        onClick={rightOnClick}
      />
    </div>
  );
};

export default TwoBtn;
