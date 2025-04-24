import { useNavigate, useOutletContext } from "react-router-dom";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { Video } from "../../../types/video";
import styles from "./VideoDeleteStyles.module.css";
import { useDeleteVideo } from "../../../hooks/useVideos";

interface ContextTypes {
	videoId: string;
	video: Video;
    setVideo:React.Dispatch<React.SetStateAction<Video | null>>
}


export default function VideoDelete() {
	const { theme } = useUserThemeContext();
	const navigate = useNavigate();
	const { videoId, video } = useOutletContext<ContextTypes>();
	const deleteVideo = useDeleteVideo();

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			await deleteVideo(videoId);
			navigate("/");
		} catch (err) {
            navigate(`/videos/${videoId}`);
        }
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}
				`}
			>
				<h2>Are you sure you want to delete {video?.title}?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete}>Yes</button>
					<button onClick={onCancel}>No</button>
				</div>
			</section>
		</div>
	);
}
