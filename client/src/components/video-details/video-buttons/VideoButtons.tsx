import { UserForAuth } from "../../../types/user";
import { Video } from "../../../types/video";
import styles from "./VideoButtonsStyles.module.css";
interface VideoButtonsProps {
	user: UserForAuth | null | undefined;
	video: Video | null | undefined;
	theme: "light" | "dark" | undefined;
}

export default function VideoButtons({
	user,
	video,
	theme,
}: VideoButtonsProps) {
	const likeIds = video?.likes.map((el) => el._id);
	const dislikeIds = video?.dislikes.map((el) => el._id);

	return (
		<>
			{user?._id == video?.ownerId._id ? (
				<section className={styles.ownerButtons}>
					<div className={styles.ownerLikes}>
						<i className="fa-solid fa-thumbs-up"></i>
						<p>{video?.likes.length}</p>
					</div>
					<button>Edit</button>
					<button>Delete</button>
					<div className={styles.ownerDislikes}>
						<i className="fa-solid fa-thumbs-down"></i>
						<p>{video?.dislikes.length}</p>
					</div>
				</section>
			) : (
				<section
					className={`${styles.userButtons} ${
						theme == "dark"
							? "darkTheme-light"
							: "whiteTheme-darkWhite"
					}`}
				>
					<div className={styles.userLikes}>
						{user?._id && likeIds?.includes(user?._id) ? (
							<i className="fa-solid fa-thumbs-up"></i>
						) : (
							<i className="fa-regular fa-thumbs-up"></i>
						)}
						<p>{video?.likes.length}</p>
					</div>
					<div className={styles.userDislikes}>
						{user?._id && dislikeIds?.includes(user?._id) ? (
							<i className="fa-solid fa-thumbs-down"></i>
						) : (
							<i className="fa-regular fa-thumbs-down"></i>
						)}
						<p>{video?.dislikes.length}</p>
					</div>
				</section>
			)}
		</>
	);
}
