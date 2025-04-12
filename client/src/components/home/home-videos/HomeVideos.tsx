import { Link } from "react-router-dom";
import { User } from "../../../types/user";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "./HomeVideosStyles.module.css"

interface HomeVideosProp {
	id: string;
	title: string;
	thumbnail: string;
	owner: User;
}

export default function HomeVideos({
	id,
	title,
	thumbnail,
	owner,
}: HomeVideosProp) {
    const {theme}=useUserThemeContext();
	return (
		<article className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"} id={styles.wrapper}>
			<div className={styles.header}>
				<img src={owner.profileImage} />
				<p>{owner.username}</p>
			</div>
			<div className={styles.body}>
				<img src={thumbnail} alt={title} />
				<h2>{title}</h2>
				<Link to={`/videos/${id}`}>Watch</Link>
			</div>
		</article>
	);
}
