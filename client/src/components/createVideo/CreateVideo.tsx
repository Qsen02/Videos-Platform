import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../commons/customInput";
import CustomTextarea from "../../commons/custumTextarea";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useCreateVideo } from "../../hooks/useVideos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVideoSchema } from "../../schemas/validationShema";

export default function CreateVideo() {
	const { theme } = useUserThemeContext();
	const createVideo = useCreateVideo();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate=useNavigate();

	interface valuesType {
		title: string;
		videoUrl: string;
		thumbnail: string;
		description: string;
	}

	const initValues = {
		title: "",
		videoUrl: "",
		thumbnail: "",
		description: "",
	};

	async function onAdd(
		values: valuesType,
		actions: FormikHelpers<valuesType>
	) {
		try {
			const title = values.title;
			const videoUrl = values.videoUrl;
			const thumbnail = values.thumbnail;
			const description = values.description;
			await createVideo({
				title: title,
				videoUrl: videoUrl,
				thumbnail: thumbnail,
				description: description,
			});
			actions.resetForm();
			navigate("/");
		} catch (err) {
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			} else {
				setErrMessage("Error occured!");
			}
		}
	}

	return (
		<Formik initialValues={initValues} onSubmit={onAdd} validationSchema={createVideoSchema}>
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
					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}
