import * as yup from "yup";

export const registerShema = yup.object().shape({
	username: yup
		.string()
		.min(3, "Username must be at least 3 symbols long!")
		.required("Username is required!"),
	email: yup
		.string()
		.email("Email must be valid email!")
		.required("Email is required!"),
	profileImage: yup
		.string()
		.matches(/^https?:\/\//, "Profile image must be valid URL"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		)
		.required("Password is required!"),
	repass: yup
		.string()
		.oneOf([yup.ref("password")], "Password must match!")
		.required("Repeat password is required!"),
});

export const loginSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, "Username or password don't match!")
		.required("Username is required!"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
			"Username or password don't match!"
		)
		.required("Password is required!"),
});
