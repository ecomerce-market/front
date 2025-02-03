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
  borderRadius?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  width = "320px",
  height = "46px",
  bgcolor = "white",
  borderRadius = "5px",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.inputField}
      style={{
        width,
        height,
        backgroundColor: bgcolor,
        borderRadius,
        padding: "10px",
        outline: "none",
        fontSize: "14px",
      }}
    />
  );
};

export default TextInput;
