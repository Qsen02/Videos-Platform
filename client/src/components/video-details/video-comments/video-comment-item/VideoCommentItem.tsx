import { Link, useNavigate } from "react-router-dom";
import { User, UserForAuth } from "../../../../types/user";
import { errorProfileImage } from "../../../../utils/errorVideoAndImage";
import styles from "./VideoCommentItemStyles.module.css";
import {
	useLikeComment,
	useUnlikeComment,
} from "../../../../hooks/useComments";
import { Video } from "../../../../types/video";

interface VideoCommentItemProps {
	commentId: string;
	videoId: string;
	theme: "light" | "dark" | undefined;
	owner: User;
	content: string;
	curUser: UserForAuth | null | undefined;
	likes: string[];
	setVideo: React.Dispatch<React.SetStateAction<Video>>;
}

export default function VideoCommentItem({
	commentId,
	videoId,
	theme,
	owner,
	content,
	curUser,
	likes,
	setVideo,
}: VideoCommentItemProps) {
	const likeComment = useLikeComment();
	const unlikeComment = useUnlikeComment();
	const navigate = useNavigate();

	async function onLike() {
		try {
			const updatedVideo = await likeComment(commentId);
			setVideo(updatedVideo);
		} catch (err) {
			navigate("404");
		}
	}

	async function onUnlike() {
		try {
			const updatedVideo = await unlikeComment(commentId);
			setVideo(updatedVideo);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<article
			className={`${styles.wrapper} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			}`}
		>
			<div className={styles.commentBody}>
				<img src={owner.profileImage} onError={errorProfileImage} />
				<p>{owner.username}</p>
				{curUser?._id == owner._id ? (
					<>
						<Link
							to={`/videos/${videoId}/comments/${commentId}/edit`}
						>
							<i className="fa-solid fa-pen-to-square"></i>
						</Link>
						<Link
							to={`/videos/${videoId}/comments/${commentId}/delete`}
						>
							<i className="fa-solid fa-trash"></i>
						</Link>
					</>
				) : (
					""
				)}
				{curUser ? (
					<div className={styles.commentLikes}>
						{curUser?._id &&
						(likes.includes(curUser?._id) ||
							curUser._id == owner._id) ? (
							<i
								className="fa-solid fa-thumbs-up"
								id={
									curUser._id == owner._id ? styles.owner : ""
								}
								onClick={
									curUser._id == owner._id
										? undefined
										: onUnlike
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
				) : (
					<div className={styles.guestLikes}>
						<i className="fa-solid fa-thumbs-up"></i>
						<p>{likes.length}</p>
					</div>
				)}
			</div>
			<p>{content}</p>
		</article>
	);
}
