import { NavLink } from "react-router-dom";
import { Link } from "../../../types/link";

export default function HeaderItem({ name, link }: Link) {
	return (
		<li>
			<NavLink
				style={({ isActive }) => (isActive ? { color: "red" } : {})}
				to={link}
			>
				{name}
			</NavLink>
		</li>
	);
}
