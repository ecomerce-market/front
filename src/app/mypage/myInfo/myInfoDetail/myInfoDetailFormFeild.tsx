import React from "react";
import TextInput from "@/components/input/textInput";
import { FormField as FormFieldType } from "./myInfoDetailType";
import styles from "./myInfoDetail.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface FormFieldProps {
    field: FormFieldType;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    inputSize: { width: string; height: string };
}

export const FormField: React.FC<FormFieldProps> = ({
    field,
    value = "",
    onChange,
    error,
    inputSize,
}) => {
    const displayValue = field.format ? field.format(value) : value;

    return (
        <div>
            <span>{field.label}</span>
            <div>
                <TextInput
                    {...inputSize}
                    type={field.type || "text"}
                    value={displayValue}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    readOnly={field.readOnly}
                />
                {error && <span className={cx("errorMessage")}>{error}</span>}
            </div>
        </div>
    );
};

export default FormField;
