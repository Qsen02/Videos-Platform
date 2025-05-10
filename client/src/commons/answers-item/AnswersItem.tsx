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
}

export default function AnswersItem({
	id,
	content,
	owner,
	likes,
}: AnswersItemProps) {
	const { theme } = useUserThemeContext();

	return (
		<article
			className={`${styles.wrapperItem} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			}`}
		>
			<div className={styles.header}>
				<Link to={`/profiles/${owner._id}`}><img src={owner.profileImage} onError={errorProfileImage} /></Link>
				<h2>{owner.username}</h2>
			</div>
			<div className={styles.body}>
				<p>{content}</p>
			</div>
		</article>
	);
}
