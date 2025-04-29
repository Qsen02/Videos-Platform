import { useState } from "react";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetAllVideos, useSearchVideos } from "../../hooks/useVideos";
import styles from "./HomeStyles.module.css";
import { Form, Formik } from "formik";
import CustomInput from "../../commons/customInput";
import VideoItem from "../../commons/video-item/VideoItem";
import { useSearchUsers } from "../../hooks/useUsers";
import CustomSelect from "../../commons/customSelect";
import UserItem from "../../commons/user-item/UserItem";

export default function Home() {
	const { theme } = useUserThemeContext();
	const [isSearched, setIsSearched] = useState(false);
	const {
		videos,
		setVideos,
		users,
		setUsers,
		loading,
		setLoading,
		error,
		setError,
	} = useGetAllVideos([]);
	const searchVideos = useSearchVideos();
	const searchUsers = useSearchUsers();

	async function onSearch(values: { query: string; criteria: string }) {
		try {
			setLoading(true);
			let query = values.query;
			if (query == "") {
				query = "No value";
			}
			const criteria = values.criteria;
			if (criteria == "videos" || criteria=="Videos") {
				const videos = await searchVideos(query);
				setVideos({ type: "searchVideos", payload: videos });
				setUsers(null);
			} else {
				const users = await searchUsers(query);
				setUsers(users);
			}
			setIsSearched(true);
			setLoading(false);
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	return (
		<>
			<Formik
				initialValues={{ query: "", criteria: "Videos" }}
				onSubmit={onSearch}
			>
				{(props) => (
					<Form className={styles.form}>
						<p>
							<CustomInput
								type="text"
								name="query"
								placeholder="Search videos..."
								className={
									theme == "dark"
										? "darkTheme-dark"
										: "whiteTheme-light"
								}
							/>
							<button
								type="submit"
								className={
									theme == "dark"
										? "darkTheme-dark"
										: "whiteTheme-light"
								}
							>
								<i className="fa-solid fa-magnifying-glass"></i>
							</button>
						</p>
						<p>
							<CustomSelect
								value="videos"
								name="criteria"
								className={
									theme == "dark"
										? "darkTheme-dark"
										: "whiteTheme-light"
								}
							/>
						</p>
					</Form>
				)}
			</Formik>
			<section className={styles.videoContainer}>
				{!error && loading ? (
					<span className="loader"></span>
				) : videos.length == 0 && !isSearched && !error ? (
					<h2>No videos yet.</h2>
				) : isSearched && videos.length == 0 && !error ? (
					<h2>No results.</h2>
				) : error ? (
					<h2>Server is not responding, please try again later!</h2>
				) : users && users.length > 0 ? (
					users.map((el) => (
						<UserItem
							key={el._id}
							id={el._id}
							profileImage={el.profileImage}
							username={el.username}
						/>
					))
				) : users?.length == 0 ? (
					<h2>No users yet</h2>
				) : (
					videos.map((el) => (
						<VideoItem
							key={el._id}
							id={el._id}
							title={el.title}
							thumbnail={el.thumbnail}
							owner={el.ownerId}
							isProfilePage={false}
						/>
					))
				)}
			</section>
		</>
	);
}
