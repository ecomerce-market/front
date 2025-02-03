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
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `var(${bgcolor})`,
        color: `var(${color})` || "black",
        borderRadius: "5px",
        padding: padding || "26px 10px",
        border: `${borderSize}px solid var(${border})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "BMHANNAPro",
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight || "400",
      }}
    >
      {title}
    </button>
  );
};

export default OneBtn;
