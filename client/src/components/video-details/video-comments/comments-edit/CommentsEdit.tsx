import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUserThemeContext } from "../../../../contexts/UserAndTheme";
import { useState } from "react";
import { CommentFormTypes } from "../../../../types/initialFormTypes";
import { Form, Formik, FormikHelpers } from "formik";
import { VideoOutletContextType } from "../../../../types/outletContext";
import { commentSchema } from "../../../../schemas/validationShema";
import CustomInput from "../../../../commons/customInput";
import {
	useEditComment,
	useGetOneComment,
} from "../../../../hooks/useComments";

export default function CommentEdit() {
	const { theme } = useUserThemeContext();
	const { commentId } = useParams();
	const { videoId, setVideo } = useOutletContext<VideoOutletContextType>();
	const [errMessage, setErrMessage] = useState("");
	const [isErr, setIsErr] = useState(false);
	const navigate = useNavigate();
	const { comment, loading, error } = useGetOneComment(
		{ content: "" },
		commentId
	);
	const editComment = useEditComment();

	async function onEdit(
		values: CommentFormTypes,
		actions: FormikHelpers<CommentFormTypes>
	) {
		try {
			const content = values.content;
			const updatedVideo=await editComment(commentId, { content: content });
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
				content: comment.content,
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
