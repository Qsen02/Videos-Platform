import { Link } from "react-router-dom";
import styles from "./VideoItemStyles.module.css";
import { User } from "../../types/user";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import {
	errorProfileImage,
	errorVideoImage,
} from "../../utils/errorVideoAndImage";

interface HomeVideosProp {
	id: string;
	title: string;
	thumbnail: string;
	owner: User;
	isProfilePage: boolean;
}

export default function VideoItem({
	id,
	title,
	thumbnail,
	owner,
	isProfilePage,
}: HomeVideosProp) {
	const { theme, user } = useUserThemeContext();
	return (
		<article
			className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"}
			id={styles.wrapper}
		>
			{!isProfilePage ? (
				<div className={styles.header}>
					{user ? (
						<Link to={`/profiles/${owner._id}`}>
							<img
								src={owner.profileImage}
								onError={errorProfileImage}
							/>
						</Link>
					) : (
						<img
							src={owner.profileImage}
							onError={errorProfileImage}
						/>
					)}
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
