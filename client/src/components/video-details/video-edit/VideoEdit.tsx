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
import { useUploadThumbnail, useUploadVideo } from "../../../hooks/useCloudinary";

export default function VideoEdit() {
	const { theme } = useUserThemeContext();
	const { videoId, video, setVideo, loading, error } =
		useOutletContext<VideoOutletContextType>();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const editVideo = useEditVideo();
	const [isEditing, setIsEditing] = useState(false);
	const uploadVideo = useUploadVideo();
	const uploadThumbnail = useUploadThumbnail();

	async function onEdit(
		values: EditFormTypes,
		actions: FormikHelpers<EditFormTypes>,
	) {
		try {
			setIsEditing(true);
			const videoData = await uploadVideo(values.videoUrl as File);
			const thumbnailData = await uploadThumbnail(values.thumbnail as File);
			const title = values.title;
			const description = values.description;
			const videoUrl = videoData.secure_url;
			const thumbnailUrl = thumbnailData.secure_url;
			const videoPublicId = videoData.public_id;
			const thumbnailId = thumbnailData.public_id;
			const updatedVideo = await editVideo(videoId, {
				title,
				description,
				videoUrl,
				thumbnailUrl,
				videoId: videoPublicId,
				thumbnailId,
			});
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
								<div className="buttons">
									<button type="submit" disabled={isEditing} className={isEditing ? "disabled" : ""}>
												{isEditing ? "Saving" : "Save"} { isEditing && <span className="smallLoader"></span> }
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
