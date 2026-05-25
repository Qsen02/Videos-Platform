import { useNavigate, useOutletContext } from "react-router-dom";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "./VideoDeleteStyles.module.css";
import { useDeleteVideo } from "../../../hooks/useVideos";
import { VideoOutletContextType } from "../../../types/outletContext";
import { useState } from "react";

export default function VideoDelete() {
	const { theme } = useUserThemeContext();
	const navigate = useNavigate();
	const { videoId, video } = useOutletContext<VideoOutletContextType>();
	const deleteVideo = useDeleteVideo();
	const [isDeleting, setIsDeleting] = useState(false);

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			setIsDeleting(true);
			await deleteVideo(videoId);
			navigate("/");
		} catch (err) {
			setIsDeleting(false);
			navigate("404");
		} finally {
			setIsDeleting(false);
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
					<button
						onClick={onDelete}
						disabled={isDeleting}
						className={isDeleting ? "disabled" : ""}
					>
						{isDeleting ? "Deleting" : "Yes"}{" "}
						{isDeleting && <span className="smallLoader"></span>}
					</button>
					<button
						onClick={onCancel}
						disabled={isDeleting}
						className={isDeleting ? "disabled" : ""}
					>
						No
					</button>
				</div>
			</section>
		</div>
	);
}
