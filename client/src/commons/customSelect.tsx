import { useField } from "formik";
import { useUserThemeContext } from "../contexts/UserAndTheme";

interface CustomSelectProps {
	name: string;
	label?: string;
	className?: string;
	value?: string;
}

export default function CustomSelect({ label, ...props }: CustomSelectProps) {
	const { user } = useUserThemeContext();
	const [field, meta] = useField(props);
	
	return (
		<>
			{label ? <label>{label}</label> : ""}
			<select {...props} {...field}>
				<option value="videos">Videos</option>
				{user ? <option value="users">Users</option> : ""}
			</select>
			{meta.error && meta.touched ? (
				<p className="error">{meta.error}</p>
			) : (
				""
			)}
		</>
	);
}
