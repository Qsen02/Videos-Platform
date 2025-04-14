import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/customInput";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useUsers";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { registerShema } from "../../schemas/validationShema";
import { useState } from "react";

export default function Register() {
	const { setUser, theme } = useUserThemeContext();
	const register = useRegister();
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showRepass, setShowRepass] = useState(false);

	const initialValues = {
		username: "",
		email: "",
		profileImage: "",
		password: "",
		repass: "",
	};

	interface FormValues {
		username: string;
		email: string;
		profileImage: string;
		password: string;
		repass: string;
	}

	function onShowPassword(){
		if(showPassword){
			setShowPassword(false);
		}else{
			setShowPassword(true);
		}
	}

	function onShowRepass(){
		if(showRepass){
			setShowRepass(false);
		}else{
			setShowRepass(true);
		}
	}

	async function onRegister(
		values: FormValues,
		actions: FormikHelpers<FormValues>
	) {
		try {
			const username = values.username;
			const email = values.email;
			const profileImage = values.profileImage;
			const password = values.password;
			const repass = values.repass;
			const user = await register({
				username,
				email,
				profileImage,
				password,
				repass,
			});
			if (setUser) {
				setUser(user);
			}
			actions.resetForm();
			navigate("/");
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
		}
	}

	return (
		<Formik
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
							type="text"
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
							<i className="fa-regular fa-eye" onClick={onShowPassword}></i>
						) : (
							<i className="fa-regular fa-eye-slash" onClick={onShowPassword}></i>
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
							<i className="fa-regular fa-eye" onClick={onShowRepass}></i>
						) : (
							<i className="fa-regular fa-eye-slash" onClick={onShowRepass}></i>
						)}
					</p>
					<button type="submit">Submit</button>
					<p>
						Already have account? You can{" "}
						<Link to="/login">login</Link> here.
					</p>
				</Form>
			)}
		</Formik>
	);
}
