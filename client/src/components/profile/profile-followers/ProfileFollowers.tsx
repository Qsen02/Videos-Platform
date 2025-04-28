import { useParams } from "react-router-dom";
import { useGetFollowers } from "../../../hooks/useUsers";
import FollowerItem from "../../../commons/follower-item/FollowerItem";
import { useUserThemeContext } from "../../../contexts/UserAndTheme";
import styles from "./ProfileFollowersStyles.module.css";

export default function ProfileFollowers() {
	const { theme } = useUserThemeContext();
	const { userId } = useParams();
	const { followers, loading, error } = useGetFollowers([], userId);

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
				<h2>Followers</h2>
				<section className={styles.followerContainer}>
					{followers.length == 0 ? (
						<p>No followers yet</p>
					) : (
						followers.map((el) => (
							<FollowerItem
								key={el._id}
								id={el._id}
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
