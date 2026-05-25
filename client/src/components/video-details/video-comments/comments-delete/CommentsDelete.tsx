import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUserThemeContext } from "../../../../contexts/UserAndTheme";
import { VideoOutletContextType } from "../../../../types/outletContext";
import styles from "./CommentDeleteStyles.module.css";
import { useDeleteComment } from "../../../../hooks/useComments";
import { useState } from "react";

export default function CommentDelete() {
	const { theme } = useUserThemeContext();
	const { commentId } = useParams();
	const navigate = useNavigate();
	const { videoId, setVideo } = useOutletContext<VideoOutletContextType>();
	const deleteComment = useDeleteComment();
	const [isDeleting, setIsDeleting] = useState(false);

	function onCancel() {
		history.back();
	}

	async function onDelete() {
		try {
			setIsDeleting(true);
			await deleteComment(videoId, commentId);
			setVideo((prev) => ({
				...prev,
				comments: prev.comments.filter((c) => c._id !== commentId),
			}));
			navigate(`/videos/${videoId}`);
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
				<h2>Are you sure you want to delete this comment?</h2>
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
