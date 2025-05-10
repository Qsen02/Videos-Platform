import { Link } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { User } from "../../types/user";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import styles from "./AnswersItemStyles.module.css";

export interface AnswersItemProps {
	id: string;
	content: string;
	owner: User;
	likes: User[];
	commentId:string | undefined;
	videoId:string | undefined;
}

export default function AnswersItem({
	id,
	content,
	owner,
	likes,
	commentId,
	videoId
}: AnswersItemProps) {
	const { theme,user } = useUserThemeContext();

	return (
		<article
			className={`${styles.wrapperItem} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			}`}
		>
			<div className={styles.header}>
				<Link to={`/profiles/${owner._id}`}><img src={owner.profileImage} onError={errorProfileImage} /></Link>
				<h2>{owner.username}</h2>
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
			</div>
			<div className={styles.body}>
				<p>{content}</p>
			</div>
		</article>
	);
}
