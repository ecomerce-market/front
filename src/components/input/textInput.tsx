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
  name?: string;
  padding?: string;
  icon?: React.ReactNode;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  width,
  height,
  bgcolor,
  icon,
  padding,
  name,
  type,
}) => {
<<<<<<< HEAD
  return (
    <div style={{ position: "relative" }}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.inputField}
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          backgroundColor: bgcolor,
          borderRadius: "10px",
          padding: padding || "10px",
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
=======
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
                        fontSize: "18px",
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                >
                    {icon}
                </div>
            )}
>>>>>>> 74f9211d60acf9afa80d10df243493eb7137719d
        </div>
      )}
    </div>
  );
};

export default TextInput;
