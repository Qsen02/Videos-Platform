import { useNavigate, useOutletContext } from "react-router-dom";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { createVideoSchema } from "../../../schemas/validationShema";
import CustomInput from "../../../commons/customInput";
import CustomTextarea from "../../../commons/custumTextarea";
import { useEditVideo, useGetOneVideoForEdit } from "../../../hooks/useVideos";
import { Video } from "../../../types/video";

interface ContextTypes {
	videoId: string;
	video: Video;
    setVideo:React.Dispatch<React.SetStateAction<Video | null>>
}

export default function VideoEdit() {
	const { theme } = useUserThemeContext();
	const { videoId ,setVideo} = useOutletContext<ContextTypes>();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
    const editVideo=useEditVideo();
	interface valuesType {
		title: string;
		videoUrl: string;
		thumbnail: string;
		description: string;
	}
	const initValues = {
		_id: "",
		title: "",
		videoUrl: "",
		description: "",
		thumbnail: "",
	};

	const { video, error, loading } = useGetOneVideoForEdit(
		initValues,
		videoId
	);

	async function onEdit(
		values: valuesType,
		actions: FormikHelpers<valuesType>
	) {
		try {
			const title = values.title;
			const videoUrl = values.videoUrl;
			const thumbnail = values.thumbnail;
			const description = values.description;
			const updatedVideo=await editVideo(videoId,{
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

    function onCancel(){
        navigate(`/videos/${videoId}`);
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
			enableReinitialize
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
								Something went wrong! Please try again later.
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
