import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/customInput";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useUsers";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { registerShema } from "../../schemas/validationShema";
import { useState } from "react";
import { RegisterFormTypes } from "../../types/initialFormTypes";
import { useUploadProfileImage } from "../../hooks/useCloudinary";

export default function Register() {
	const { setUser, theme } = useUserThemeContext();
	const register = useRegister();
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showRepass, setShowRepass] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const uploadProfileImage = useUploadProfileImage();

	const initialValues = {
		username: "",
		email: "",
		profileImage: null,
		password: "",
		repass: "",
	};

	function onShowPassword() {
		if (showPassword) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	}

	function onShowRepass() {
		if (showRepass) {
			setShowRepass(false);
		} else {
			setShowRepass(true);
		}
	}

	async function onRegister(
		values: RegisterFormTypes,
		actions: FormikHelpers<RegisterFormTypes>,
	) {
		try {
			setIsRegistering(true);
			const profileImageData = await uploadProfileImage(
				values.profileImage as File,
			);
			const username = values.username;
			const email = values.email;
			const password = values.password;
			const repass = values.repass;
			const profileImageUrl = profileImageData.secure_url;
			const profileImageId = profileImageData.public_id;
			const user = await register({
				username,
				email,
				password,
				profileImageUrl,
				profileImageId,
				repass,
			});
			if (setUser) {
				setUser(user);
			}
			actions.resetForm();
			navigate("/");
		} catch (err) {
			setIsRegistering(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
		} finally {
			setIsRegistering(false);
		}
	}

	return (
		<Formik<RegisterFormTypes>
			initialValues={initialValues}
			onSubmit={onRegister}
			validationSchema={registerShema}
		>
			{(props) => (
				<Form
					className={`form ${
						theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
					}`}
				>
					<h2>Here you can create your account.</h2>
					{isErr ? <p className="error">{errMessage}</p> : ""}
					<p className="input">
						<CustomInput
							label="Username"
							type="text"
							name="username"
							className={
								theme == "dark"
									? "darkTheme-light"
									: "whiteTheme-darkWhite"
							}
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Email"
							type="text"
							name="email"
							className={
								theme == "dark"
									? "darkTheme-light"
									: "whiteTheme-darkWhite"
							}
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Profile image"
							type="file"
							name="profileImage"
							className={
								theme == "dark"
									? "darkTheme-light"
									: "whiteTheme-darkWhite"
							}
						/>
					</p>
					<p className="input">
						<CustomInput
							label="Password"
							type={showPassword ? "text" : "password"}
							name="password"
							className={
								theme == "dark"
									? "darkTheme-light"
									: "whiteTheme-darkWhite"
							}
						/>
						{showPassword ? (
							<i
								className="fa-regular fa-eye"
								onClick={onShowPassword}
							></i>
						) : (
							<i
								className="fa-regular fa-eye-slash"
								onClick={onShowPassword}
							></i>
						)}
					</p>
					<p className="input">
						<CustomInput
							label="Repeat password"
							type={showRepass ? "text" : "password"}
							name="repass"
							className={
								theme == "dark"
									? "darkTheme-light"
									: "whiteTheme-darkWhite"
							}
						/>
						{showRepass ? (
							<i
								className="fa-regular fa-eye"
								onClick={onShowRepass}
							></i>
						) : (
							<i
								className="fa-regular fa-eye-slash"
								onClick={onShowRepass}
							></i>
						)}
					</p>
					{isRegistering && <span className="loader"></span>}
					<button type="submit" disabled={isRegistering}>
						{isRegistering ? "Registering..." : "Submit"}
					</button>
					<p>
						Already have account? You can{" "}
						<Link to="/login">Login</Link> here.
					</p>
				</Form>
			)}
		</Formik>
	);
}
