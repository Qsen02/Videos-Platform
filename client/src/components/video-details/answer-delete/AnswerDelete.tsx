import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styles from "../video-delete/VideoDeleteStyles.module.css"
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { useDeleteAnswer } from "../../../hooks/useAnswers";
import { VideoOutletContextType } from "../../../types/outletContext";

export default function CommentDelete() {
	const { theme } = useUserThemeContext();
    const {commentId,answerId,videoId}=useParams();
	const navigate = useNavigate();
    const deleteAnswer=useDeleteAnswer();
	const {setVideo}=useOutletContext<VideoOutletContextType>()

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			const newData=await deleteAnswer(answerId,commentId);
			setVideo(newData.video);
			navigate(`/videos/${videoId}/comments/${commentId}/answers`);
		} catch (err) {
            navigate("404");
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
				<h2>Are you sure you want to delete this answer?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete}>Yes</button>
					<button onClick={onCancel}>No</button>
				</div>
			</section>
		</div>
	);
}