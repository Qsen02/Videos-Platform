import { Link, Outlet, useParams } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetOneVideo } from "../../hooks/useVideos";
import styles from "./VideoDetailsStyles.module.css";
import VideoButtons from "./video-buttons/VideoButtons";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import VideoCommentSection from "./video-comments/VideoCommentSection";
import { transformTime } from "../../utils/transformTime";

export default function VideoDetails() {
	const { theme, user } = useUserThemeContext();
	const { videoId } = useParams();
	const initValues = {
		_id: "",
		title: "",
		videoUrl: {
			imageUrl: "",
			publicId: "",
		},
		description: "",
		thumbnail: {
			imageUrl: "",
			publicId: "",
		},
		likes: [],
		dislikes: [],
		comments: [],
		ownerId: {
			_id: "",
			username: "",
			email: "",
			profileImage: {
				imageUrl: "",
				publicId: "",
			},
			password: "",
			followers: [],
			created_at: "",
		},
		created_at: "",
	};
	const { video, setVideo, loading, error } = useGetOneVideo(
		initValues,
		videoId,
	);
	const optimizedVideo = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/f_mp4,q_auto/${video?.videoUrl.publicId ?? ""}.mp4`;
	return (
		<>
			<Outlet context={{ videoId, video, setVideo, loading, error }} />
			<section
				className={
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}
				id={styles.detailsWrapper}
			>
				{loading && !error ? (
					<span className="loader"></span>
				) : !loading && error ? (
					<h2>Server is not responding, please try again later!</h2>
				) : (
					<>
						<h2>{video?.title}</h2>
						<video controls preload="metadata">
							<source src={optimizedVideo} type="video/mp4" />
							Your browser does not support video.
						</video>
						<section className={styles.descriptionWrapper}>
							<div className={styles.owner}>
								{user ? (
									<Link to={`/profiles/${video.ownerId._id}`}>
										<img
											src={
												video?.ownerId.profileImage
													.imageUrl
											}
											onError={errorProfileImage}
										/>
									</Link>
								) : (
									<img
										src={
											video?.ownerId.profileImage.imageUrl
										}
										onError={errorProfileImage}
									/>
								)}
								<p>{video?.ownerId.username}</p>
								<p id={styles.time}>
									{transformTime(video.created_at)}
								</p>
							</div>
							<p className={styles.description}>
								{video?.description}
							</p>
						</section>
						<VideoButtons
							user={user}
							video={video}
							theme={theme}
							setVideoHandler={setVideo}
						/>
						<VideoCommentSection
							videoId={video._id}
							comments={video?.comments}
							setVideoHandler={setVideo}
						/>
					</>
				)}
			</section>
		</>
	);
}
