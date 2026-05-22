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
	const navigate = useNavigate();
	const [isCreating,setIsCreating]=useState(false);

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
		actions: FormikHelpers<valuesType>
	) {
		try {
			setIsCreating(true);
			if(!values.videoUrl || !values.thumbnail){
				setIsErr(true);
				setErrMessage("Video and thumbnail are required!");
				return;
			}
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("video", values.videoUrl as Blob);
			formData.append("thumbnail", values.thumbnail as Blob);	
			formData.append("description", values.description);
			await createVideo(formData);
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
		}finally{
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
					{ 
						isCreating && <span className="loader"></span>
					}
					<button type="submit" disabled={isCreating}>
						{isCreating ? "Creating..." : "Submit"}
					</button>
				</Form>
			)}
		</Formik>
	);
}
