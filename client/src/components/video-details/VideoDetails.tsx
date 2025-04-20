import { useParams } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetOneVideo } from "../../hooks/useVideos";
import styles from "./VideoDetailsStyles.module.css";
import VideoButtons from "./video-buttons/VideoButtons";

export default function VideoDetails() {
	const { theme, user } = useUserThemeContext();
	const { videoId } = useParams();
	const { video, loading, error } = useGetOneVideo(null, videoId);

	return (
		<section
			className={theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"}
			id={styles.detailsWrapper}
		>
			<h2>{video?.title}</h2>
			<iframe
				src={`https://www.youtube.com/embed/${video?.videoUrl}`}
				allowFullScreen
			></iframe>
			<section className={styles.descriptionWrapper}>
				<div className={styles.owner}>
					<img src={video?.ownerId.profileImage} />
					<p>{video?.ownerId.username}</p>
				</div>
				<p className={styles.description}>{video?.description}</p>
			</section>
			<VideoButtons user={user} video={video} theme={theme}/>
		</section>
	);
}
