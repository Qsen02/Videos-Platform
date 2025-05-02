import { Link } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import styles from "./UserItemStyles.module.css";

interface UserItemProps {
	id: string;
	username: string;
	profileImage: string;
}

export default function UserItem({
	id,
	username,
	profileImage,
}: UserItemProps) {
	const { theme } = useUserThemeContext();

	return (
		<Link to={`/profiles/${id}`}>
			<article
				className={`${styles.wrapper} ${
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}`}
			>
				<img src={profileImage} onError={errorProfileImage} />
				<h2>{username}</h2>
			</article>
		</Link>
	);
}
