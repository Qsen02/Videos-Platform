import { Form, Formik, FormikHelpers } from "formik";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import CustomInput from "../../../commons/customInput";
import { useState } from "react";
import { changePasswordSchema } from "../../../schemas/validationShema";
import { ChangePasswordFormTypes } from "../../../types/initialFormTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePassword } from "../../../hooks/useUsers";
import styles from "./ProfileChangePasswordStyles.module.css"

export default function ProfileChangePassword() {
	const { theme } = useUserThemeContext();
	const { userId } = useParams();
	const [showPassword, setShowPassword] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const changePassword = useChangePassword();
	const navigate = useNavigate();

	async function onChangePassword(
		values: ChangePasswordFormTypes,
		actions: FormikHelpers<ChangePasswordFormTypes>
	) {
		try {
			const newPassword = values.newPassword;
			await changePassword(userId, { newPassword: newPassword });
			actions.resetForm();
			navigate(`/profile/${userId}/confirm`);
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
		}
	}

	function onShowPassword() {
		if (showPassword) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	}

	function onCancel() {
		history.back();
	}

	return (
		<Formik
			initialValues={{
				newPassword: "",
			}}
			onSubmit={onChangePassword}
			validationSchema={changePasswordSchema}
		>
			{(props) => (
				<div className="modal">
					<Form
						className={`form ${
							theme == "dark"
								? "darkTheme-dark"
								: "whiteTheme-light"
						}`}
					>
						<h2>Change your password here</h2>
						{isErr ? <p className="error">{errMessage}</p> : ""}
						<p className="input">
							<CustomInput
								type={showPassword ? "text" : "password"}
								name="newPassword"
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
                                    id={styles.eye}
								></i>
							) : (
								<i
									className="fa-regular fa-eye-slash"
									onClick={onShowPassword}
                                    id={styles.eye}
								></i>
							)}
						</p>
						<div className="buttons">
							<button type="submit">Change</button>
							<button onClick={onCancel}>Cancel</button>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
}
