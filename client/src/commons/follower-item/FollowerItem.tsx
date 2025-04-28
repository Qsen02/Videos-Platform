import { Link } from "react-router-dom";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./FollowerItemStyles.module.css";

interface FollowerItemProps {
	id: string;
	profileImage: string;
	username: string;
}

export default function FollowerItem({
	id,
	profileImage,
	username,
}: FollowerItemProps) {
	const { theme, user } = useUserThemeContext();
	return (
		<article
			className={`${styles.wrapper} ${
				theme == "dark" ? "darkTheme-light" : "whiteTheme-darkWhite"
			} ${user?._id == id ? styles.you : ""}`}
		>
			<Link to={`/profile/${id}`}>
				<img src={profileImage} onError={errorProfileImage} />
			</Link>
			<p>{username}</p>
		</article>
	);
}
