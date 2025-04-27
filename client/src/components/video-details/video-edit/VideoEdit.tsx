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

	async function onEdit(
		values: EditFormTypes,
		actions: FormikHelpers<EditFormTypes>
	) {
		try {
			const title = values.title;
			const videoUrl = values.videoUrl;
			const thumbnail = values.thumbnail;
			const description = values.description;
			const updatedVideo = await editVideo(videoId, {
				title: title,
				videoUrl: videoUrl,
				thumbnail: thumbnail,
				description: description,
			});
			actions.resetForm();
			setVideo(updatedVideo);
			navigate(`/videos/${videoId}`);
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occured!");
			}
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
		<Formik
			initialValues={{
				title: video.title,
				description: video.description,
				videoUrl: video.videoUrl,
				thumbnail: video.thumbnail,
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
								Server is not responding, please try again later!
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
										label="Video ID"
										type="text"
										name="videoUrl"
										placeholder="oAdEoFrGhTfg"
										className={
											theme == "dark"
												? "darkTheme-light"
												: "whiteTheme-darkWhite"
										}
									/>
								</p>
								<p className="input">
									<CustomInput
										label="Thumbnail URL"
										type="text"
										name="thumbnail"
										placeholder="https://exmaple.com"
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
									<button type="submit">Save</button>
									<button onClick={onCancel}>Cancel</button>
								</div>
							</>
						)}
					</Form>
				</div>
			)}
		</Formik>
	);
}
