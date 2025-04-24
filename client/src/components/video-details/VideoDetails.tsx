import { Outlet, useParams } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetOneVideo } from "../../hooks/useVideos";
import styles from "./VideoDetailsStyles.module.css";
import VideoButtons from "./video-buttons/VideoButtons";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import VideoCommentSection from "./video-comments/VideoCommentSection";

export default function VideoDetails() {
	const { theme, user } = useUserThemeContext();
	const { videoId } = useParams();
	const initValues={
			_id: "",
			title: "",
			videoUrl: "",
			description: "",
			thumbnail: "",
			likes: [],
			dislikes: [],
			comments: [],
			ownerId:{
				_id:"",
				username:"",
				email:"",
				profileImage:"",
				password:"",
				followers:[]
			}
	}
	const { video, setVideo, loading, error } = useGetOneVideo(initValues, videoId);
	return (
		<>
			<Outlet context={{ videoId, video, setVideo,loading,error }} />
			<section
				className={
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
				}
				id={styles.detailsWrapper}
			>
				{loading && !error ? (
					<span className="loader"></span>
				) : !loading && error ? (
					<h2>Something went wrong! Please try again later.</h2>
				) : (
					<>
						<h2>{video?.title}</h2>
						<iframe
							src={`https://www.youtube.com/embed/${video?.videoUrl}`}
							allowFullScreen
						></iframe>
						<section className={styles.descriptionWrapper}>
							<div className={styles.owner}>
								<img
									src={video?.ownerId.profileImage}
									onError={errorProfileImage}
								/>
								<p>{video?.ownerId.username}</p>
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
						<VideoCommentSection videoId={video._id} comments={video?.comments} setVideoHandler={setVideo}/>
					</>
				)}
			</section>
		</>
	);
}
