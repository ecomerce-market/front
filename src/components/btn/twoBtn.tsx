import OneBtn from "./oneBtn";

interface TwoBtnPros {
  leftTitle: string;
  rightTitle: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
}

const TwoBtn: React.FC<TwoBtnPros> = ({
  leftTitle,
  rightTitle,
  leftOnClick,
  rightOnClick,
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
        bgcolor="--white"
        onClick={leftOnClick}
      />
      <OneBtn
        title={rightTitle}
        width={"155"}
        bgcolor="--main-color"
        onClick={rightOnClick}
      />
    </div>
  );
};

export default TwoBtn;
