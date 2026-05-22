import { Link } from "react-router-dom";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./FollowerItemStyles.module.css";
import { FileType } from "../../types/video";

interface FollowerItemProps {
	id: string;
	profileImage: FileType;
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
			<Link to={`/profiles/${id}`}>
				<img
					src={profileImage.imageUrl ?? "/assets/profile.png"}
					onError={errorProfileImage}
				/>
			</Link>
			<p>{username}</p>
		</article>
	);
}
