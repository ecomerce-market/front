import { ReactNode } from "react";

interface OneBtnProps {
<<<<<<< HEAD
  title: ReactNode;
  width: string;
  height?: string;
  bgcolor?: string;
  color?: string;
  onClick?: () => void;
  fontSize?: string;
  padding?: string;
  border?: string;
  borderSize?: string;
  fontWeight?: string;
  type?: "button" | "submit" | "reset";
}

const OneBtn: React.FC<OneBtnProps> = ({
  title,
  width,
  bgcolor,
  color,
  onClick,
  fontSize,
  padding,
  height,
  border,
  borderSize,
  fontWeight,
  type,
}) => {
  return (
    <button
      onClick={onClick} // 추가
      type={type}
      style={{
        // 가로
        width: `${width}px`,
        // 세로
        height: `${height}px`,
        //배경색
        backgroundColor: `var(${bgcolor})`,
        //글자색, 기본 블랙
        color: `var(${color})` || "black",
        //보더 5인데 피그마에 2도 있고 다양한데 5가 제일 예쁠듯...?
        borderRadius: "5px",
        //패딩, 기본 26,10
        padding: padding || "10px 26px",
        //보더 사이즈 솔리드고정 색상 borderColor 아님 주의
        border:
          borderSize && border
            ? `${borderSize}px solid var(${border})`
            : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "BMHANNAPro",
        //폰트사이즈 기본 16px
        fontSize: `${fontSize}px` || "16px",
        fontWeight: fontWeight || "400",
      }}
    >
      {title}
    </button>
  );
=======
    title: ReactNode;
    width: string;
    height?: string;
    bgcolor?: string;
    color?: string;
    onClick?: () => void;
    fontSize?: string;
    padding?: string;
    border?: string;
    borderSize?: string;
    fontWeight?: string;
    icon?: string;
}

const OneBtn: React.FC<OneBtnProps> = ({
    title,
    width,
    bgcolor,
    color,
    onClick,
    fontSize,
    padding,
    height,
    border,
    borderSize,
    fontWeight,
    icon,
}) => {
    return (
        <div>
            {icon}{" "}
            <button
                onClick={onClick} // 추가
                style={{
                    // 가로
                    width: `${width}px`,
                    // 세로
                    height: `${height}px`,
                    //배경색
                    backgroundColor: `var(${bgcolor})`,
                    //글자색, 기본 블랙
                    color: `var(${color})` || "black",
                    //보더 5인데 피그마에 2도 있고 다양한데 5가 제일 예쁠듯...?
                    borderRadius: "5px",
                    //패딩, 기본 26,10
                    padding: padding || "26px 10px",
                    //보더 사이즈 솔리드고정 색상 borderColor 아님 주의
                    border:
                        borderSize && border
                            ? `${borderSize}px solid var(${border})`
                            : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontFamily: "BMHANNAPro",
                    //폰트사이즈 기본 16px
                    fontSize: `${fontSize}px` || "16px",
                    fontWeight: fontWeight || "400",
                }}
            >
                {title}
            </button>
        </div>
    );
>>>>>>> 74f9211d60acf9afa80d10df243493eb7137719d
};

export default OneBtn;
