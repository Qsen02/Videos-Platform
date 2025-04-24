import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/customInput";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useUsers";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { loginSchema } from "../../schemas/validationShema";
import { useState } from "react";
import { LoginFormTypes } from "../../types/initialFormTypes";

export default function Login() {
	const { setUser, theme } = useUserThemeContext();
    const login=useLogin();
	const navigate = useNavigate();
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const initialValues = {
		username: "",
		password: "",
	};

	function onShowPassword(){
		if(showPassword){
			setShowPassword(false);
		}else{
			setShowPassword(true);
		}
	}

	async function onLogin(
		values: LoginFormTypes,
		actions: FormikHelpers<LoginFormTypes>
	) {
		try {
			const username = values.username;
			const password = values.password;
			const user = await login({
				username,
				password
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
			onSubmit={onLogin}
			validationSchema={loginSchema}
		>
			{(props) => (
				<Form
					className={`form ${
						theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
					}`}
				>
					<h2>Here you can login into your account.</h2>
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
					<button type="submit">Submit</button>
					<p>
						Don't have account? You can{" "}
						<Link to="/register">Register</Link> here.
					</p>
				</Form>
			)}
		</Formik>
	);
}