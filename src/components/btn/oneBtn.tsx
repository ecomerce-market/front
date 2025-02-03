interface OneBtnProps {
  title: string;
  width: string;
  height?: string;
  bgcolor?: string;
  color?: string;
  onClick?: () => void;
  fontSize: string;
  padding?: string;
  border?: string;
  borderSize?: string;
  fontWeight?: string;
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
}) => {
  return (
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
        //보더 사이즈 솔리드고정 색상
        border: `${borderSize}px solid var(${border})`,
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
};

export default OneBtn;
