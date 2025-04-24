import { Link, useNavigate } from "react-router-dom";
import { UserForAuth } from "../../../types/user";
import { Video } from "../../../types/video";
import styles from "./VideoButtonsStyles.module.css";
import { useDislikeVideo, useLikeVideo, useUndislikeVideo, useUnlikeVideo } from "../../../hooks/useVideos";
interface VideoButtonsProps {
	user: UserForAuth | null | undefined;
	video: Video | null | undefined;
	theme: "light" | "dark" | undefined;
	setVideoHandler:React.Dispatch<React.SetStateAction<Video>>;
}

export default function VideoButtons({
	user,
	video,
	theme,
	setVideoHandler
}: VideoButtonsProps) {
	const navigate=useNavigate();
	const likeVideo=useLikeVideo();
	const unlikeVideo=useUnlikeVideo();
	const dislikeVideo=useDislikeVideo();
	const undislikeVideo=useUndislikeVideo();

	async function onLike(){
		try{
			const updatedVideo=await likeVideo(video?._id);
			setVideoHandler(updatedVideo);
		}catch(err){
			navigate("404");
		}
	}

	async function onUnlike(){
		try{
			const updatedVideo=await unlikeVideo(video?._id);
			setVideoHandler(updatedVideo);
		}catch(err){
			navigate("404");
		}
	}

	async function onDislike(){
		try{
			const updatedVideo=await dislikeVideo(video?._id);
			setVideoHandler(updatedVideo);
		}catch(err){
			navigate("404");
		}
	}

	async function onUndislike(){
		try{
			const updatedVideo=await undislikeVideo(video?._id);
			setVideoHandler(updatedVideo);
		}catch(err){
			navigate("404");
		}
	}

	return (
		<>
			{!user ? (
				<section className={styles.ownerButtons}>
					<div className={styles.ownerLikes}>
						<i className="fa-solid fa-thumbs-up"></i>
						<p>{video?.likes.length}</p>
					</div>
					<div className={styles.ownerDislikes}>
						<i className="fa-solid fa-thumbs-down"></i>
						<p>{video?.dislikes.length}</p>
					</div>
				</section>
			) : user?._id == video?.ownerId._id ? (
				<section className={styles.ownerButtons}>
					<div className={styles.ownerLikes}>
						<i className="fa-solid fa-thumbs-up"></i>
						<p>{video?.likes.length}</p>
					</div>
					<Link to={`/videos/${video?._id}/edit`}>
						<button>Edit</button>
					</Link>
					<Link to={`/videos/${video?._id}/delete`}>
						<button>Delete</button>
					</Link>
					<div className={styles.ownerDislikes}>
						<i className="fa-solid fa-thumbs-down"></i>
						<p>{video?.dislikes.length}</p>
					</div>
				</section>
			) : (
				<section
					className={`${styles.userButtons} ${
						theme == "dark"
							? "darkTheme-light"
							: "whiteTheme-darkWhite"
					}`}
				>
					<div className={styles.userLikes}>
						{user?._id && video?.likes?.includes(user?._id) ? (
							<i className="fa-solid fa-thumbs-up" onClick={onUnlike}></i>
						) : (
							<i className="fa-regular fa-thumbs-up" onClick={onLike}></i>
						)}
						<p>{video?.likes.length}</p>
					</div>
					<div className={styles.userDislikes}>
						{user?._id && video?.dislikes?.includes(user?._id) ? (
							<i className="fa-solid fa-thumbs-down" onClick={onUndislike}></i>
						) : (
							<i className="fa-regular fa-thumbs-down" onClick={onDislike}></i>
						)}
						<p>{video?.dislikes.length}</p>
					</div>
				</section>
			)}
		</>
	);
}
