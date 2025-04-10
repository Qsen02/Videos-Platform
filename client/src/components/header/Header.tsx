import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<ul>
				<li>
					<NavLink to="/">Videos</NavLink>
				</li>
				<li>
					<NavLink to="/">Login</NavLink>
				</li>
				<li>
					<NavLink to="/">Register</NavLink>
				</li>
			</ul>
		</header>
	);
}
