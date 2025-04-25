import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUserThemeContext } from "../../../../contexts/UserAndTheme";
import { OutletContextType } from "../../../../types/outletContext";
import styles from "./CommentDeleteStyles.module.css"
import { useDeleteComment } from "../../../../hooks/useComments";

export default function CommentDelete() {
	const { theme } = useUserThemeContext();
    const {commentId}=useParams();
	const navigate = useNavigate();
	const { videoId, setVideo } = useOutletContext<OutletContextType>();
    const deleteComment=useDeleteComment();

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			const updatedVideo=await deleteComment(videoId,commentId);
            setVideo(updatedVideo);
			navigate(`/videos/${videoId}`);
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
				<h2>Are you sure you want to delete this comment?</h2>
				<div className={styles.buttons}>
					<button onClick={onDelete}>Yes</button>
					<button onClick={onCancel}>No</button>
				</div>
			</section>
		</div>
	);
}