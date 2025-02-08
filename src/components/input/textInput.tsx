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
  readOnly?: boolean | undefined;
  fontSize?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  width,
  height,
  bgcolor,
  icon,
  name,
  readOnly,
  fontSize,
  type,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        // 여기 비밀번호 인풋 때문에 type은 프롭스로 뺀건데 비밀번호 인풋 타입 password로 안해도 되나요요?
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        name={name}
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
    </div>
  );
};

export default TextInput;
