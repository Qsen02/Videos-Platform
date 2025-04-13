import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetAllVideos } from "../../hooks/useVideos";
import HomeVideos from "./home-videos/HomeVideos";
import styles from "./HomeStyles.module.css";

export default function Home() {
	const { theme } = useUserThemeContext();
	const { videos, loading, error } = useGetAllVideos([]);
	return (
		<>
			<form className={styles.form}>
				<p>
					<input
						type="text"
						name="query"
						placeholder="Search..."
						className={
							theme == "dark"
								? "darkTheme-dark"
								: "whiteTheme-light"
						}
					/>
					<button
						className={
							theme == "dark"
								? "darkTheme-dark"
								: "whiteTheme-light"
						}
					>
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</p>
				<select
					name="criteria"
					className={
						theme == "dark" ? "darkTheme-dark" : "whiteTheme-light"
					}
				>
					<option value="videos">Videos</option>
					<option value="users">Users</option>
				</select>
			</form>
			<section className={styles.videoContainer}>
				{videos.length == 0 ? (
					<h2>No videos yet.</h2>
				) : (
					videos.map((el) => (
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
	);
}
