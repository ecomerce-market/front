import { ReactNode } from "react";
import styles from "./oneBtn.module.scss";
import cn from "classnames/bind";
import classNames from "classnames";

const cx = cn.bind(styles);

interface OneBtnProps {
  title: ReactNode;

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
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
}

const OneBtn: React.FC<OneBtnProps> = ({
  title,

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
  type,
  disabled,
  className,
}) => {
  return (
    <div className={cx("button-components-wrap")}>
      {icon}
      <button
        className={className}
        disabled={disabled}
        type={type}
        onClick={onClick} // 추가
        style={{
          // 가로
          // width: `${width}px`,
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
};

export default OneBtn;
