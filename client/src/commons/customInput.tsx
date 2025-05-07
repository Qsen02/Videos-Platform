import { useField, useFormikContext } from "formik";

interface CustomInputProps {
	label?: string;
	placeholder?: string;
	type: string;
	name: string;
	className?: string;
	changeHandler?: (values: {
		query: string;
		criteria: "videos" | "users";
	}) => Promise<void>;
}

export default function CustomInput({
	label,
	changeHandler,
	...props
}: CustomInputProps) {
	const [field, meta] = useField(props);
	const { values } = useFormikContext<{
		query: string;
		criteria: "videos" | "users";
	}>();

	async function change(event: React.ChangeEvent<HTMLInputElement>) {
		field.onChange(event);
		if (changeHandler) {
			await changeHandler(values);
		}
	}

	return (
		<>
			{label ? <label>{label}</label> : ""}
			<input {...props} {...field} onChange={change} />
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
