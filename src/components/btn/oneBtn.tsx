interface OneBtnProps {
    title: string;
    width: string;
    bgcolor?: string;
    icon?: string;
    color?: string;
    onClick?: () => void; // 추가
}

const OneBtn: React.FC<OneBtnProps> = ({
    title,
    width,
    bgcolor,
    color,
    icon,
    onClick,
}) => {
    return (
        <button
            onClick={onClick} // 추가
            style={{
                width: `${width}px`,
                backgroundColor: `var(${bgcolor})`,
                color: `var(${color})` || "black",
                borderRadius: "5px",
                padding: "26px 10px",
                border: " 1px solid var(--black-200)",
                height: "46px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontFamily: "BMHANNAPro",
            }}
        >
            {icon}
            {title}
        </button>
    );
};

export default OneBtn;
