import React from "react";
import styles from "./textInput.module.scss";

interface TextInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    height?: string;
    bgcolor?: string;
    border?: string;
    icon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChange,
    width,
    height,
    bgcolor,
    icon,
}) => {
    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.inputField}
                style={{
                    width: width ? `${width}px` : undefined,
                    height: height ? `${height}px` : undefined,
                    backgroundColor: bgcolor,
                    borderRadius: "10px",
                    padding: "10px",
                    outline: "none",
                    fontSize: "14px",
                }}
            />
            {icon && (
                <div
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
};

export default TextInput;
