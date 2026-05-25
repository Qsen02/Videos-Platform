import { NavLink } from "react-router-dom";
import styles from "./SubMenu.module.css";

interface SubMenuProps {
	menu: {
		name: string;
		link: string;
	}[];
	theme: "light" | "dark" | undefined;
	openHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubMenu({ menu, theme, openHandler }: SubMenuProps) {
	return (
		<div className="menuModal">
			<section
				className={`
                    ${theme == "dark" ? "darkTheme-dark" : "whiteTheme-verylight"}
                     ${styles.wrapper}
				`}
			>
				<div className={styles.head}>
					<i className="fa-solid fa-video"></i>
					<button onClick={() => openHandler(false)}>X</button>
				</div>
				<div className={styles.body}>
					<ul className={styles.menu}>
						{menu.map((el) => (
							<li key={el.name}>
								<NavLink
									to={el.link}
									style={({ isActive }) => ({
										color: isActive
											? "rgb(225, 0, 0)"
											: theme === "dark"
												? "white"
												: "black",
									})}
									onClick={() => openHandler(false)}
								>
									{el.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}
