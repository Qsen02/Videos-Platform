import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useCreateAnswer, useGetAllAnswers } from "../../../hooks/useAnswers";
import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/customInput";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import AnswersItem from "../../../commons/answers-item/AnswersItem";
import styles from "./AnswersSectionStyles.module.css";
import { CommentFormTypes } from "../../../types/initialFormTypes";

export default function AnswersSection() {
	const { commentId,videoId } = useParams();
	const { theme } = useUserThemeContext();
	const { answers, setAnswers, owner, loading, error } = useGetAllAnswers(
		[],
		commentId
	);
	const createAnswer = useCreateAnswer();
	const navigate=useNavigate();

	async function onAnswer(
		values: CommentFormTypes,
		actions: FormikHelpers<CommentFormTypes>
	) {
		const content = values.content;
		const updatedComment = await createAnswer(commentId, {
			content: content,
		});
		setAnswers(updatedComment.answers);
		actions.resetForm();
	}

	function onBack() {
		navigate(`/videos/${videoId}`);
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}`}
			>
				{loading && !error ? (
					<span className="loader"></span>
				) : error ? (
					<>
						<h2>
							Server is not responding! Please try again later.
						</h2>
						<button onClick={onBack}>X</button>
					</>
				) : (
					<>
						<h2>Answers to {owner?.username}</h2>
						<button onClick={onBack}>X</button>
						<Formik
							initialValues={{ content: "" }}
							onSubmit={onAnswer}
						>
							{(props) => (
								<Form className="form">
									<p className="input">
										<CustomInput
											type="text"
											name="content"
											placeholder="Write answer..."
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
						<section className={styles.answersWrapper}>
							{answers.length == 0 ? (
								<h2>No answers yet</h2>
							) : (
								answers.map((el) => (
									<AnswersItem
										key={el._id}
										id={el._id}
										content={el.content}
										owner={el.ownerId}
										likes={el.likes}
										commentId={commentId}
										videoId={videoId}
									/>
								))
							)}
						</section>
					</>
				)}
			</section>
		</div>
	);
}
