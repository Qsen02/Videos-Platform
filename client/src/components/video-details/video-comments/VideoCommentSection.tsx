import { Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../../commons/customInput";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { Comment } from "../../../types/comment";
import VideoCommentItem from "./video-comment-item/VideoCommentItem";
import styles from "./VideoCommentSectionStyles.module.css";
import { CommentFormTypes } from "../../../types/initialFormTypes";
import { useCreateComment } from "../../../hooks/useComments";
import { commentSchema } from "../../../schemas/validationShema";
import { Video } from "../../../types/video";
import { useState } from "react";

interface VideoCommentSectionProps {
	comments: Comment[] | null | undefined;
	videoId: string;
	setVideoHandler: React.Dispatch<React.SetStateAction<Video>>;
}

export default function VideoCommentSection({
	comments,
	videoId,
	setVideoHandler,
}: VideoCommentSectionProps) {
	const { theme, user } = useUserThemeContext();
	const createComment = useCreateComment();
	const [commenting, setCommenting] = useState(false);

	async function onComment(
		values: CommentFormTypes,
		actions: FormikHelpers<CommentFormTypes>,
	) {
		try {
			setCommenting(true);
			const content = values.content;
			const newComment = await createComment(videoId, {
				content: content,
			});
			setVideoHandler((prev) => ({
				...prev,
				comments: [...prev.comments, newComment],
			}));
			actions.resetForm();
		} catch (err) {
			setCommenting(false);
		} finally {
			setCommenting(false);
		}
	}

	return (
		<section className={styles.wrapper}>
			<h2>Comments: {comments?.length}</h2>
			{user ? (
				<Formik
					initialValues={{ content: "" }}
					onSubmit={onComment}
					validationSchema={commentSchema}
				>
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
							<button
								type="submit"
								disabled={commenting}
								className={commenting ? "disabled" : ""}
							>
								{commenting ? "Commenting" : "Comment"}{" "}
								{commenting && (
									<span className="smallLoader"></span>
								)}
							</button>
						</Form>
					)}
				</Formik>
			) : (
				""
			)}
			<section className={styles.commentWrapper}>
				{comments?.length == 0 ? (
					<p>No comments yet, be the first one!</p>
				) : (
					comments?.map((el) => (
						<VideoCommentItem
							key={el._id}
							commentId={el._id}
							videoId={videoId}
							theme={theme}
							owner={el.ownerId}
							content={el.content}
							curUser={user}
							likes={el.likes}
							answers={el.answers}
							setVideo={setVideoHandler}
							time={el.created_at}
						/>
					))
				)}
			</section>
		</section>
	);
}
