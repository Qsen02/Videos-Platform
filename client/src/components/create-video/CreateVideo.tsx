import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/customInput";
import CustomTextarea from "../../commons/custumTextarea";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useCreateVideo } from "../../hooks/useVideos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVideoSchema } from "../../schemas/validationShema";
import { useUploadThumbnail, useUploadVideo } from "../../hooks/useCloudinary";

export default function CreateVideo() {
	const { theme } = useUserThemeContext();
	const createVideo = useCreateVideo();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const [isCreating, setIsCreating] = useState(false);
	const uploadVideo = useUploadVideo();
	const uploadThumbnail = useUploadThumbnail();

	interface valuesType {
		title: string;
		videoUrl: File | null;
		thumbnail: File | null;
		description: string;
	}

	const initValues = {
		title: "",
		videoUrl: null,
		thumbnail: null,
		description: "",
	};

	async function onAdd(
		values: valuesType,
		actions: FormikHelpers<valuesType>,
	) {
		try {
			setIsCreating(true);
			if (!values.videoUrl || !values.thumbnail) {
				setIsErr(true);
				setErrMessage("Video and thumbnail are required!");
				return;
			}
			const videoData = await uploadVideo(values.videoUrl);
			const thumbnailData = await uploadThumbnail(values.thumbnail);
			const title = values.title;
			const description = values.description;
			const videoUrl = videoData.secure_url;
			const thumbnailUrl = thumbnailData.secure_url;
			const videoId = videoData.public_id;
			const thumbnailId = thumbnailData.public_id;
			await createVideo({
				title,
				description,
				videoUrl,
				thumbnailUrl,
				videoId,
				thumbnailId,
			});
			actions.resetForm();
			navigate("/");
		} catch (err) {
			setIsErr(true);
			setIsCreating(false);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occured!");
			}
		} finally {
			setIsCreating(false);
		}
	}

	return (
		<Formik<valuesType>
			initialValues={initValues}
			onSubmit={onAdd}
			validationSchema={createVideoSchema}
		>
			{(props) => (
				<Form
					className={`form ${
						theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
					}`}
				>
					<h2>You can add video here</h2>
					{isErr ? <p className="error">{errMessage}</p> : ""}
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
					{isCreating && <span className="loader"></span>}
					<button type="submit" disabled={isCreating}>
						{isCreating ? "Creating..." : "Submit"}
					</button>
				</Form>
			)}
		</Formik>
	);
}
