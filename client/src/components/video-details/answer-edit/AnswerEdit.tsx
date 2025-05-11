import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { CommentFormTypes } from "../../../types/initialFormTypes";
import { commentSchema } from "../../../schemas/validationShema";
import CustomInput from "../../../commons/customInput";
import { useEditAnswer, useGetOneAnswer } from "../../../hooks/useAnswers";

export default function AnswerEdit() {
	const { theme } = useUserThemeContext();
	const { videoId,commentId,answerId } = useParams();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
    const {answer,loading,error}=useGetOneAnswer({content:""},answerId);
    const editAnswer=useEditAnswer();

	async function onEdit(
		values: CommentFormTypes,
		actions: FormikHelpers<CommentFormTypes>
	) {
		try {
			const content = values.content;
		    await editAnswer(answerId, { content: content });
			actions.resetForm();
			navigate(`/videos/${videoId}/comments/${commentId}/answers`);
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
			navigate(`/videos/${videoId}/comments/${commentId}/answers`);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<Formik
			initialValues={{
				content: answer.content,
			}}
			onSubmit={onEdit}
			validationSchema={commentSchema}
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
								<h2>You can edit your comment</h2>
								{isErr ? (
									<p className="error">{errMessage}</p>
								) : (
									""
								)}
								<p className="input">
									<CustomInput
										type="text"
										name="content"
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
