import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styles from "../video-delete/VideoDeleteStyles.module.css"
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import { useDeleteAnswer } from "../../../hooks/useAnswers";
import { VideoOutletContextType } from "../../../types/outletContext";
import { useState } from "react";

export default function CommentDelete() {
	const { theme } = useUserThemeContext();
    const {commentId,answerId,videoId}=useParams();
	const navigate = useNavigate();
    const deleteAnswer=useDeleteAnswer();
	const { setVideo } = useOutletContext<VideoOutletContextType>();
	const [isDeleting, setIsDeleting] = useState(false);

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			setIsDeleting(true);
			const newData=await deleteAnswer(answerId,commentId);
			setVideo(newData.video);
			navigate(`/videos/${videoId}/comments/${commentId}/answers`);
		} catch (err) {
			setIsDeleting(false);
            navigate("404");
        }finally{
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
				<h2>Are you sure you want to delete this answer?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete} disabled={isDeleting} className={isDeleting ? "disabled" : ""}>
						{isDeleting ? "Deleting" : "Yes"} {isDeleting && <span className="smallLoader"></span>}
					</button>
					<button onClick={onCancel} disabled={isDeleting} className={isDeleting ? "disabled" : ""}>
						No
					</button>
				</div>
			</section>
		</div>
	);
}