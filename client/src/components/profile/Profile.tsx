import { useParams } from "react-router-dom";
import { useGetOneUser } from "../../hooks/useUsers";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./ProfileStyles.module.css";
import HomeVideos from "../home/home-videos/HomeVideos";

export default function Profile() {
	const { userId } = useParams();
	const { user } = useUserThemeContext();
	const { curUser, follwedUsers, createdVideos, loading, error } =
		useGetOneUser(null, userId);
	const followersId = curUser?.followers.map((el) => el._id);

	return (
		<>
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
								<p>Followers: {curUser?.followers.length}</p>
								<p>Followed: {follwedUsers.length}</p>
							</div>
							<div className={styles.buttons}>
								{curUser?._id != user?._id ? (
									user?._id &&
									followersId?.includes(user?._id) ? (
										<p>Following!</p>
									) : (
										<button>Follow</button>
									)
								) : (
									<>
										<button>Change password</button>
										<button>Edit profile</button>
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
								<HomeVideos
									key={el._id}
									id={el._id}
									title={el.title}
									thumbnail={el.thumbnail}
									owner={el.ownerId}
								/>
							))
						)}
					</section>
				</>
			)}
		</>
	);
}
