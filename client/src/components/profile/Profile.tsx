import { useParams } from "react-router-dom";
import { useGetOneUser } from "../../hooks/useUsers";
import { errorProfileImage } from "../../utils/errorVideoAndImage";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./ProfileStyles.module.css";

export default function Profile() {
	const { userId } = useParams();
	const { user } = useUserThemeContext();
	const { curUser, loading, error } = useGetOneUser(null, userId);
	const followersId = curUser?.followers.map((el) => el._id);

	return (
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
						<p>Followed: 1</p>
					</div>
					<div className={styles.buttons}>
						{curUser?._id != user?._id ? (
							user?._id && followersId?.includes(user?._id) ? (
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
		</>
	);
}
