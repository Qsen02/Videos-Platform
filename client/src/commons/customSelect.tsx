import { useField } from "formik";

interface CustomSelectProps {
	name: string;
	label?: string;
	className?: string;
}

export default function CustomSelect({ label, ...props }: CustomSelectProps) {
	const [field, meta] = useField(props);
	return (
		<>
			{label ? <label>{label}</label> : ""}
			<select {...props} {...field}>
				<option value="videos" selected>
					Videos
				</option>
				<option value="users" selected>
					Users
				</option>
			</select>
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
