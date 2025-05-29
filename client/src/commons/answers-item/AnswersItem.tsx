import { Link, useNavigate } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { User } from "../../types/user";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import styles from "./AnswersItemStyles.module.css";
import { useLikeAnswer, useUnlikeAnswer } from "../../hooks/useAnswers";
import { Comment } from "../../types/comment";
import { transformTime } from "../../utils/transformTime";

export interface AnswersItemProps {
	id: string;
	content: string;
	owner: User;
	likes: string[];
	commentId: string | undefined;
	videoId: string | undefined;
	setCommentHandler: React.Dispatch<React.SetStateAction<Comment | null>>;
	time:string;
}

export default function AnswersItem({
	id,
	content,
	owner,
	likes,
	commentId,
	videoId,
	setCommentHandler,
	time
}: AnswersItemProps) {
	const { theme, user } = useUserThemeContext();
	const likeAnswer = useLikeAnswer();
	const unlikeAnswer = useUnlikeAnswer();
	const navigate = useNavigate();

	async function onLike() {
		try {
			const updatedComment = await likeAnswer(id);
			setCommentHandler(updatedComment);
		} catch (err) {
			navigate("404");
		}
	}

	async function onUnlike() {
		try {
			const updatedComment = await unlikeAnswer(id);
			setCommentHandler(updatedComment);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article
			className={`${styles.wrapperItem} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			}`}
		>
			<div className={styles.header}>
				<Link to={`/profiles/${owner._id}`}>
					<img src={owner.profileImage} onError={errorProfileImage} />
				</Link>
				<h2>{owner.username}</h2>
				<p id={styles.time}>{transformTime(time)}</p>
				{user?._id == owner._id ? (
					<>
						<Link
							to={`/videos/${videoId}/comments/${commentId}/answers/${id}/edit`}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</Link>
						<Link
							to={`/videos/${videoId}/comments/${commentId}/answers/${id}/delete`}
						>
							<i className="fa-solid fa-trash"></i>
						</Link>
					</>
				) : (
					""
				)}
				<div className={styles.answerLikes}>
					{user?._id &&
					(likes.includes(user._id) || user._id == owner._id) ? (
						<i
							className="fa-solid fa-thumbs-up"
							id={user._id == owner._id ? styles.owner : ""}
							onClick={
								user._id == owner._id ? undefined : onUnlike
							}
						></i>
					) : (
						<i
							className="fa-regular fa-thumbs-up"
							onClick={onLike}
						></i>
					)}
					<p>{likes.length}</p>
				</div>
			</div>
			<div className={styles.body}>
				<p>{content}</p>
			</div>
		</article>
	);
}
