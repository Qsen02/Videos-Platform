import { NavLink } from "react-router-dom";
import { Link } from "../../../types/link";
import styles from "./HeaderItemStyles.module.css"

export default function HeaderItem({ name, link }: Link) {
	return (
		<li className={styles.item}>
			<NavLink
				style={({ isActive }) => (isActive ? { color: "lightgrey" } : {})}
				to={link}
			>
				{name}
			</NavLink>
		</li>
	);
}
