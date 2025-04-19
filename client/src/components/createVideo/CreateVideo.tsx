import { Form, Formik } from "formik";
import CustomInput from "../../commons/customInput";
import CustomTextarea from "../../commons/custumTextarea";
import { useUserThemeContext } from "../../contexts/UserAndTheme";

export default function CreateVideo() {
	const { theme } = useUserThemeContext();

	const initValues = {
		title: "",
		videoUrl: "",
		thumbnail: "",
		description: "",
	};

	async function onAdd() {}

	return (
		<Formik initialValues={initValues} onSubmit={onAdd}>
			{(props) => (
				<Form
					className={`form ${
						theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
					}`}
				>
					<h2>You can add video here</h2>
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
							label="Video id"
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
