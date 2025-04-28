import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useFollow, useGetOneUser, useUnfollow } from "../../hooks/useUsers";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./ProfileStyles.module.css";
import VideoItem from "../../commons/video-item/VideoItem";

export default function Profile() {
	const { userId } = useParams();
	const { user } = useUserThemeContext();
	const { curUser, setUser, follwedUsers, createdVideos, loading, error } =
		useGetOneUser(null, userId);
	const followersId = curUser?.followers.map((el) => el._id);
	const followUser = useFollow();
	const unfollowUser = useUnfollow();
	const navigate = useNavigate();

	async function onFollow() {
		try {
			const updatedUser = await followUser(userId);
			setUser(updatedUser);
		} catch (err) {
			navigate("404");
		}
	}

	async function onUnfollow() {
		try {
			const updatedUser = await unfollowUser(userId);
			setUser(updatedUser);
		} catch (err) {
			navigate("404");
		}
	}

	return (
		<>
			<Outlet context={{setUserState:setUser,userId,loading,error }} />
			{loading && !error ? (
				<span className="loader"></span>
			) : error ? (
				<h2 className={styles.error}>
					Server is not responding, please try again later!
				</h2>
			) : (
				<>
					<section className={styles.profileHeader}>
						<div className={styles.userInfo}>
							<img
								src={curUser?.profileImage}
								onError={errorProfileImage}
							/>
							<h2>{curUser?.username}</h2>
							<p>{curUser?.email}</p>
						</div>
						<div className={styles.followersWrapper}>
							<div className={styles.followers}>
								<Link to={`/profile/${curUser?._id}/followers`}><p>Followers: {curUser?.followers.length}</p></Link>
								<Link to={`/profile/${curUser?._id}/followed`}><p>Followed: {follwedUsers.length}</p></Link>
							</div>
							<div className={styles.buttons}>
								{curUser?._id != user?._id ? (
									user?._id &&
									followersId?.includes(user?._id) ? (
										<p onClick={onUnfollow}>Following!</p>
									) : (
										<button onClick={onFollow}>
											Follow
										</button>
									)
								) : (
									<>
										<Link
											to={`/profile/${userId}/change-password`}
										>
											<button>Change password</button>
										</Link>
										<Link to={`/profile/${userId}/edit`}>
											<button>Edit profile</button>
										</Link>
									</>
								)}
							</div>
						</div>
					</section>
					<h2 className={styles.title}>Created Videos</h2>
					<section className={styles.videoContainer}>
						{createdVideos.length == 0 ? (
							<p>No videos yet.</p>
						) : (
							createdVideos.map((el) => (
								<VideoItem
									key={el._id}
									id={el._id}
									title={el.title}
									thumbnail={el.thumbnail}
									owner={el.ownerId}
									isProfilePage={true}
								/>
							))
						)}
					</section>
				</>
			)}
		</>
	);
}
