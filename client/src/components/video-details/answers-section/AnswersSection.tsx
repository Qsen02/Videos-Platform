import { useParams } from "react-router-dom";
import { useGetAllAnswers } from "../../../hooks/useAnswers";
import { Form, Formik } from "formik";
import CustomInput from "../../../commons/customInput";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import AnswersItem from "../../../commons/answers-item/AnswersItem";
import styles from "./AnswersSectionStyles.module.css";

export default function AnswersSection() {
	const { commentId } = useParams();
	const { theme } = useUserThemeContext();
	const { answers, owner, loading, error } = useGetAllAnswers([], commentId);

	async function onAnswer() {}

	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}`}
			>
				<h2>Answers to {owner?.username}</h2>
				<button onClick={onBack}>X</button>
				<Formik initialValues={{ content: "" }} onSubmit={onAnswer}>
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
							/>
						))
					)}
				</section>
			</section>
		</div>
	);
}
