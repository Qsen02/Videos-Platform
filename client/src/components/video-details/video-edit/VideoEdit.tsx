import { useNavigate, useOutletContext } from "react-router-dom";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { createVideoSchema } from "../../../schemas/validationShema";
import CustomInput from "../../../commons/customInput";
import CustomTextarea from "../../../commons/custumTextarea";
import { useEditVideo } from "../../../hooks/useVideos";
import { VideoOutletContextType } from "../../../types/outletContext";
import { EditFormTypes } from "../../../types/initialFormTypes";

export default function VideoEdit() {
	const { theme } = useUserThemeContext();
	const { videoId, video, setVideo, loading, error } =
		useOutletContext<VideoOutletContextType>();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const editVideo = useEditVideo();
	const [isEditing, setIsEditing] = useState(false);

	async function onEdit(
		values: EditFormTypes,
		actions: FormikHelpers<EditFormTypes>,
	) {
		try {
			setIsEditing(true);
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("video", values.videoUrl as Blob);
			formData.append("thumbnail", values.thumbnail as Blob);
			const updatedVideo = await editVideo(videoId, formData);
			actions.resetForm();
			setVideo(updatedVideo);
			navigate(`/videos/${videoId}`);
		} catch (err) {
			setIsEditing(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occured!");
			}
		} finally {
			setIsEditing(false);
		}
	}

	function onCancel() {
		try {
			navigate(`/videos/${videoId}`);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<Formik<EditFormTypes>
			initialValues={{
				title: video.title,
				description: video.description,
				videoUrl: null,
				thumbnail: null,
			}}
			onSubmit={onEdit}
			validationSchema={createVideoSchema}
			enableReinitialize={true}
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
								<h2>You can edit video here</h2>
								{isErr ? (
									<p className="error">{errMessage}</p>
								) : (
									""
								)}
								<p className="input">
									<CustomInput
										label="Title"
										type="text"
										name="title"
										placeholder="Example"
										className={
											theme == "dark"
												? "darkTheme-light"
												: "whiteTheme-darkWhite"
										}
									/>
								</p>
								<p className="input">
									<CustomInput
										label="Video"
										type="file"
										name="videoUrl"
										className={
											theme == "dark"
												? "darkTheme-light"
												: "whiteTheme-darkWhite"
										}
									/>
								</p>
								<p className="input">
									<CustomInput
										label="Thumbnail"
										type="file"
										name="thumbnail"
										className={
											theme == "dark"
												? "darkTheme-light"
												: "whiteTheme-darkWhite"
										}
									/>
								</p>
								<p className="input">
									<CustomTextarea
										label="Description"
										type="text"
										name="description"
										placeholder="Very good example description"
										className={
											theme == "dark"
												? "darkTheme-light"
												: "whiteTheme-darkWhite"
										}
									/>
								</p>
								{isEditing && <span className="loader"></span>}
								<div className="buttons">
									<button type="submit" disabled={isEditing}>
										{isEditing ? "Saving..." : "Save"}
									</button>
									<button
										type="button"
										onClick={onCancel}
										disabled={isEditing}
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
