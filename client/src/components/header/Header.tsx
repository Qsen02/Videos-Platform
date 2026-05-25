import { useState } from "react";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import HeaderItem from "./header-item/HeaderItem";
import styles from "./HeaderStyles.module.css";
import SubMenu from "./sub-menu/SubMenu";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const { changeTheme, user, theme } = useUserThemeContext();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const guestNav = [
		{ name: "Videos", link: "/" },
		{ name: "Login", link: "/login" },
		{ name: "Register", link: "/register" },
	];

	const userNav = [
		{ name: "Videos", link: "/" },
		{ name: "Add", link: "/create" },
		{ name: "Profile", link: `/profile/${user?._id}` },
		{ name: "Logout", link: "/logout" },
	];

	function onChangeTheme() {
		if (changeTheme) {
			changeTheme();
		}
	}

	return (
		<>
			{open && (
				<SubMenu
					menu={user ? userNav : guestNav}
					theme={theme}
					openHandler={setOpen}
				/>
			)}
			<header className={styles.header}>
				<i
					className="fa-solid fa-video"
					id={styles.logo}
					onClick={() => navigate("/")}
				></i>
				<ul className={styles.navigation}>
					{user
						? userNav.map((el) => (
								<HeaderItem
									key={el.name}
									name={el.name}
									link={el.link}
								/>
							))
						: guestNav.map((el) => (
								<HeaderItem
									key={el.name}
									name={el.name}
									link={el.link}
								/>
							))}
				</ul>
				<i
					className="fa-solid fa-circle-half-stroke"
					id={theme == "dark" ? styles.darkTheme : styles.whiteTheme}
					onClick={onChangeTheme}
				></i>
				<i
					className="fa-solid fa-bars"
					id={styles.subMenu}
					onClick={() => setOpen(true)}
				></i>
			</header>
		</>
	);
}
