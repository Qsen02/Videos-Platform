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

	async function onComment(
		values: CommentFormTypes,
		actions: FormikHelpers<CommentFormTypes>
	) {
		const content = values.content;
		const updatedVideo = await createComment(videoId, { content: content });
		console.log(updatedVideo);
		setVideoHandler(updatedVideo);
		actions.resetForm();
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
							<button type="submit">Comment</button>
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
