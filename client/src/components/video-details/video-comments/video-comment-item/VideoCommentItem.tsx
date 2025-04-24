import { User, UserForAuth } from "../../../../types/user";
import { errorProfileImage } from "../../../../utils/errorVideoAndImage";
import styles from "./VideoCommentItemStyles.module.css";

interface VideoCommentItemProps {
	theme: "light" | "dark" | undefined;
	owner: User;
	content: string;
	curUser: UserForAuth | null | undefined;
	likes: User[];
}

export default function VideoCommentItem({
	theme,
	owner,
	content,
	curUser,
	likes,
}: VideoCommentItemProps) {
	const likesIds = likes.map((el) => el._id);
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
						<i className="fa-solid fa-pen-to-square"></i>
						<i className="fa-solid fa-trash"></i>
					</>
				) : (
					""
				)}
				{curUser ? (
					<div className={styles.commentLikes}>
						{curUser?._id && likesIds.includes(curUser?._id) ? (
							<i className="fa-solid fa-thumbs-up"></i>
						) : (
							<i className="fa-regular fa-thumbs-up"></i>
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
