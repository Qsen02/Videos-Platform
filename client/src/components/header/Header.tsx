import { useUserThemeContext } from "../../contexts/UserAndTheme";
import HeaderItem from "./header-item/HeaderItem";
import styles from "./HeaderStyles.module.css";

export default function Header() {
	const { changeTheme } = useUserThemeContext();
	const guestNav = [
		{ name: "Videos", link: "/" },
		{ name: "Login", link: "/login" },
		{ name: "Register", link: "/register" },
	];

	const userNav = [
		{ name: "Videos", link: "/" },
		{ name: "Add", link: "/create" },
		{ name: "Profile", link: "/profile" },
		{ name: "Logout", link: "/logout" },
	];

	function onChangeTheme() {
		if (changeTheme) {
			changeTheme();
		}
	}

	return (
		<header className={styles.header}>
			<i className="fa-solid fa-video" id={styles.logo}></i>
			<ul className={styles.navigation}>
				{guestNav.map((el) => (
					<HeaderItem key={el.name} name={el.name} link={el.link} />
				))}
			</ul>
			<i
				className="fa-solid fa-circle-half-stroke"
				id={styles.theme}
				onClick={onChangeTheme}
			></i>
		</header>
	);
}
