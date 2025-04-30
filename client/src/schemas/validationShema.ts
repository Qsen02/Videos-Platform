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

export const createVideoSchema = yup.object().shape({
	title: yup
		.string()
		.min(3, "Title must be at least 3 symbols long!")
		.required("Title is required!"),
	videoUrl: yup
	.string()
	.matches(/^https?:\/\//, "Video URL must be valid URL!")
	.required("Video URL is required!"),
	thumbnail: yup
		.string()
		.matches(/^https?:\/\//, "Thumbnail URL must be valid URL!"),
	description: yup
		.string()
		.min(10, "Descriprion mut be between 10 and 300 symbols!")
		.max(300, "Descriprion mut be between 10 and 300 symbols!")
		.required("Description is required!"),
});

export const commentSchema=yup.object().shape({
	content:yup.string().required("Field must be filled!")
})

export const editUserSchema = yup.object().shape({
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
		.matches(/^https?:\/\//, "Profile image must be valid URL")
});

export const changePasswordSchema=yup.object().shape({
	newPassword: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		)
		.required("Password is required!"),
})
