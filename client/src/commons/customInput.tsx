import { useField, useFormikContext } from "formik";

interface CustomInputProps {
	label?: string;
	name: string;
	type: string;
	className?: string;
	value?: string;
	id?: string;
	placeholder?: string;
	encType?: string;
	autoComplete?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	changehandler?: (values: {
		query: string;
		criteria: "videos" | "users" | "Videos";
	}) => Promise<void>;
}

export default function CustomInput({
	label,
	onChange,
	changehandler,
	...props
}: CustomInputProps) {
	const [field, meta, helpers] = useField(props);
	function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] || null;
		helpers.setValue(file);
		if (onChange) onChange(e);
	}
	const { values } = useFormikContext<{
		query: string;
		criteria: "videos" | "users" | "Videos";
	}>();

	async function change(event: React.ChangeEvent<HTMLInputElement>) {
		field.onChange(event);
		if (changehandler) {
			await changehandler(values);
		}
	}
	const inputProps =
		props.type === "file"
			? {
					name: props.name,
					id: props.id,
					type: "file",
					onChange: changeHandler,
				}
			: {
					...field,
					...props,
					onChange: changehandler ? change : field.onChange,
				};
	return (
		<>
			{label ? <label htmlFor={props.id}>{label}</label> : ""}
			<input {...inputProps} />
			{meta.error && meta.touched ? (
				<p className="inputError">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
