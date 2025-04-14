import { useField } from "formik";

interface CustomInputProps {
    label?: string;
    placeholder?: string;
    type: string;
    name: string;
    className?:string
}

export default function CustomTextarea({ label, ...props }: CustomInputProps) {
    const [field, meta] = useField(props);
    return (
        <>
            {label ? <label>{label}</label> : ""}
            <textarea {...props} {...field}></textarea>
            {meta.error && meta.touched ? (
                <p className="error">{meta.error}</p>
            ) : (
                ""
            )}
        </>
    );
}