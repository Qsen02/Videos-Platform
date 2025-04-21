import { Form, Formik } from "formik";
import CustomInput from "../../../commons/customInput";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { Comment } from "../../../types/comment";
import VideoCommentItem from "./video-comment-item/VideoCommentItem";
import styles from "./VideoCommentSectionStyles.module.css";

interface VideoCommentSectionProps {
	comments: Comment[] | null | undefined;
}

export default function VideoCommentSection({
	comments,
}: VideoCommentSectionProps) {
	const { theme,user } = useUserThemeContext();

	function onComment() {}

	return (
		<section className={styles.wrapper}>
			<h2>Comments: {comments?.length}</h2>
			<Formik initialValues={{ content: "" }} onSubmit={onComment}>
				{(props) => (
					<Form className={styles.form}>
							<CustomInput
								type="text"
								name="content"
								placeholder="Write comment..."
								className={
									theme == "dark"
										? "darkTheme-light"
										: "whiteTheme-darkWhite"
								}
							/>
							<button type="submit">Comment</button>
					</Form>
				)}
			</Formik>
			<section className={styles.commentWrapper}>
				{comments?.length == 0 ? (
					<p>No comments yet, be the first one!</p>
				) : (
					comments?.map((el) => (
						<VideoCommentItem
							key={el._id}
                            theme={theme}
							owner={el.ownerId}
							content={el.content}
							curUser={user}
							likes={el.likes}
						/>
					))
				)}
			</section>
		</section>
	);
}
