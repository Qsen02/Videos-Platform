import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/customInput";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserOutletContextType } from "../../../types/outletContext";
import { editUserSchema } from "../../../schemas/validationShema";
import { EditUserFormTypes } from "../../../types/initialFormTypes";
import { useState } from "react";
import { useEditUser } from "../../../hooks/useUsers";
import { useUploadProfileImage } from "../../../hooks/useCloudinary";

export default function ProfileEditUser() {
	const { theme, user, setUser } = useUserThemeContext();
	const { userId, setUserState, loading, error } =
		useOutletContext<UserOutletContextType>();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const editUser = useEditUser();
	const [isEditing, setIsEditing] = useState(false);
	const uploadProfileImage = useUploadProfileImage();

	function onCancel() {
		history.back();
	}

	async function onEdit(
		values: EditUserFormTypes,
		actions: FormikHelpers<EditUserFormTypes>,
	) {
		try {
			setIsEditing(true);
			const profileImageData = await uploadProfileImage(
				values.profileImage as File,
			);
			const username = values.username;
			const email = values.email;
			const profileImageUrl = profileImageData.secure_url;
			const profileImageId = profileImageData.public_id;
			const updatedUser = await editUser(userId, {
				username,
				email,
				profileImageUrl,
				profileImageId,
			});
			if (user && setUser) {
				user.username = updatedUser.username;
				user.email = updatedUser.email;
				user.profileImage = updatedUser.profileImage;
				setUser(user);
			}
			setUserState(updatedUser);
			actions.resetForm();
			navigate(`/profile/${userId}`);
		} catch (err) {
			setIsEditing(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occurd!");
			}
		} finally {
			setIsEditing(false);
		}
	}

	return (
		<Formik<EditUserFormTypes>
			initialValues={{
				username: user?.username ?? "",
				email: user?.email ?? "",
				profileImage: null,
			}}
			onSubmit={onEdit}
			validationSchema={editUserSchema}
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
						{loading && !error ? (
							<span className="loader"></span>
						) : error ? (
							<h2>
								Server is not responding, please try again
								later!
							</h2>
						) : (
							<>
								<h2>You can edit your profile here</h2>
								{isErr ? (
									<p className="error">{errMessage}</p>
								) : (
									""
								)}
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
								<div className="buttons">
									<button type="submit" disabled={isEditing} className={isEditing ? "disabled" : ""}>
										{isEditing ? "Saving" : "Save"} {isEditing && <span className="smallLoader"></span>}
									</button>
									<button
										type="button"
										onClick={onCancel}
										disabled={isEditing}
										className={isEditing ? "disabled" : ""}
									>
										Cancel
									</button>
								</div>
							</>
						)}
					</Form>
				</div>
			)}
		</Formik>
	);
}
