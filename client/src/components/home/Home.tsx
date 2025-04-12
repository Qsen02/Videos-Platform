import { useUserThemeContext } from "../../contexts/UserAndTheme";
import styles from "./HomeStyles.module.css";

export default function Home() {
	const {theme}=useUserThemeContext();
	return (
		<>
			<form className={styles.form}>
				<p>
					<input type="text" name="query" placeholder="Search..." className={theme=="dark"?"darkTheme-dark":"whiteTheme-light"}/>
					<button className={theme=="dark"?"darkTheme-dark":"whiteTheme-light"}>
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</p>
				<select name="criteria" className={theme=="dark"?"darkTheme-dark":"whiteTheme-light"}>
					<option value="videos">Videos</option>
					<option value="users">Users</option>
				</select>
			</form>
		</>
	);
}
