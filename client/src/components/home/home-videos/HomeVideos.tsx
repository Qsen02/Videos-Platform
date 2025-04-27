import { Link } from "react-router-dom";
import { User } from "../../../types/user";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "./HomeVideosStyles.module.css";
import {
	errorProfileImage,
	errorVideoImage,
} from "../../../utils/errorVideoAndImage";

interface HomeVideosProp {
	id: string;
	title: string;
	thumbnail: string;
	owner: User;
	isProfilePage: boolean;
}

export default function HomeVideos({
	id,
	title,
	thumbnail,
	owner,
	isProfilePage,
}: HomeVideosProp) {
	const { theme } = useUserThemeContext();
	return (
		<article
			className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"}
			id={styles.wrapper}
		>
			{!isProfilePage ? (
				<div className={styles.header}>
					<Link to={`/profile/${owner._id}`}>
						<img
							src={owner.profileImage}
							onError={errorProfileImage}
						/>
					</Link>
					<p>{owner.username}</p>
				</div>
			) : (
				""
			)}
			<div className={styles.body}>
				<img src={thumbnail} alt={title} onError={errorVideoImage} />
				<h2>{title}</h2>
				<Link to={`/videos/${id}`}>Watch</Link>
			</div>
		</article>
	);
}
