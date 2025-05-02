import { useParams } from "react-router-dom";
import { useGetFollowed } from "../../../hooks/useUsers";
import FollowerItem from "../../../commons/follower-item/FollowerItem";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "../profile-followers/ProfileFollowersStyles.module.css";

export default function ProfileFollowed() {
	const { theme } = useUserThemeContext();
	const { userId } = useParams();
	const { followed, loading, error } = useGetFollowed([], userId);
	function onBack() {
		history.back();
	}

	return (
		<div className="modal">
			<section
				className={`${styles.wrapper} ${
					theme == "dark" ? "darkTheme-dark" : "whiteTheme-light "
				}`}
			>
				<button onClick={onBack}>X</button>
				<h2>Followed users</h2>
				<section className={styles.followerContainer}>
					{loading && !error ? (
						<span className="loader"></span>
					) : error ? (
						<p>Server is not responding, please try again later!</p>
					) : followed.length == 0 ? (
						<p>No followers yet</p>
					) : (
						followed?.map((el) => (
							<FollowerItem
								key={el?._id}
								id={el?._id}
								profileImage={el.profileImage}
								username={el.username}
							/>
						))
					)}
				</section>
			</section>
		</div>
	);
}
