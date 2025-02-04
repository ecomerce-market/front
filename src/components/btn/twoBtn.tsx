import OneBtn from "./oneBtn";

interface TwoBtnPros {
    leftIcon?: string;
    rightIcon?: string;
    leftTitle: string;
    rightTitle: string;
    leftColor?: string;
    rightColor?: string;
    leftOnClick?: () => void;
    rightOnClick?: () => void;
}

const TwoBtn: React.FC<TwoBtnPros> = ({
    leftIcon,
    rightIcon,
    leftTitle,
    rightTitle,
    leftColor,
    rightColor,
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
                icon={leftIcon}
                title={leftTitle}
                width={"155"}
                bgcolor="--white"
                onClick={leftOnClick}
                color={leftColor}
            />
            <OneBtn
                icon={rightIcon}
                title={rightTitle}
                width={"155"}
                bgcolor="--main-color"
                onClick={rightOnClick}
                color={rightColor}
            />
        </div>
    );
};

export default TwoBtn;
