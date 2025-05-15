import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetAllVideos, useSearchVideos } from "../../hooks/useVideos";
import styles from "./HomeStyles.module.css";
import { Form, Formik } from "formik";
import CustomInput from "../../commons/customInput";
import VideoItem from "../../commons/video-item/VideoItem";
import { useSearchUsers } from "../../hooks/useUsers";
import CustomSelect from "../../commons/customSelect";
import UserItem from "../../commons/user-item/UserItem";
import TypedVideoItem from "../../commons/typed-video-item/TypedVideoItem";
import TypedUserItem from "../../commons/typed-user-item/TypedUserItem";

export default function Home() {
	const { theme } = useUserThemeContext();
	const {
		videos,
		setVideos,
		users,
		setUsers,
		isSearchedRef,
		setIsSearched,
		typed,
		setTyped,
		typedVideos,
		setTypedVideos,
		typedUsers,
		setTypedUsers,
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
			setIsSearched(true);
			let query = values.query;
			if (query == "") {
				query = "No value";
			}
			const criteria = values.criteria;
			if (criteria == "videos" || criteria == "Videos") {
				const videos = await searchVideos(query);
				setVideos({ type: "searchVideos", payload: videos });
				setUsers(null);
			} else {
				const users = await searchUsers(query);
				setUsers(users);
			}
			setTyped(false);
			setLoading(false);
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}

	async function onChangeHandler(values: {
		query: string;
		criteria: "videos" | "users" | "Videos";
	}) {
		try {
			setLoading(true);
			setTyped(true);
			let query = values.query;
			if (query == "") {
				query = "No value";
			}
			const criteria = values.criteria;
			if (criteria == "videos" || criteria == "Videos") {
				const videos = await searchVideos(query);
				setTypedVideos(videos);
				setTypedUsers([]);
			} else {
				const users = await searchUsers(query);
				setTypedUsers(users);
			}
			setLoading(false);
		} catch (err) {
			setTyped(false);
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
						<p className={styles.input}>
							<CustomInput
								type="text"
								name="query"
								placeholder="Search videos..."
								className={
									theme == "dark"
										? "darkTheme-dark"
										: "whiteTheme-light"
								}
								changeHandler={onChangeHandler}
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
						<p className={styles.select}>
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
						{typed ? (
							typedVideos.length > 0 && typedUsers.length==0? (
								<section
									className={styles.typedSearchContainer}
								>
									{typedVideos.map((el) => (
										<TypedVideoItem
											key={el._id}
											id={el._id}
											title={el.title}
										/>
									))}
								</section>
							) : typedUsers.length > 0? (
								<section
									className={styles.typedSearchContainer}
								>
									{typedUsers.map((el) => (
										<TypedUserItem
											key={el._id}
											id={el._id}
											username={el.username}
										/>
									))}
								</section>
							) : (
								<section
									className={styles.typedSearchContainer}
								>
									<h2>No results found</h2>
								</section>
							)
						) : (
							""
						)}
					</Form>
				)}
			</Formik>
			<section className={styles.videoContainer}>
				{!error && loading ? (
					<span className="loader"></span>
				) : videos.length == 0 && !isSearchedRef.current && !error  && !typed? (
					<h2>No videos yet.</h2>
				) : isSearchedRef.current && videos.length == 0 && !error && !typed ? (
					<h2>No results.</h2>
				) : error ? (
					<h2>Server is not responding, please try again later!</h2>
				) : users && users.length > 0 && !typed ? (
					users.map((el) => (
						<UserItem
							key={el._id}
							id={el._id}
							profileImage={el.profileImage}
							username={el.username}
						/>
					))
				) : users?.length == 0 && !typed? (
					<h2>No users yet</h2>
				) : !typed ? (
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
				) : (
					""
				)}
			</section>
		</>
	);
}
