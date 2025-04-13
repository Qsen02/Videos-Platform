import { useField } from "formik";

interface CustomInputProps {
	label?: string;
	placeholder?: string;
	type: string;
	name: string;
    className?:string
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
	const [field, meta] = useField(props);
	return (
		<>
			{label ? <label>{label}</label> : ""}
			<input {...props} {...field} />
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
