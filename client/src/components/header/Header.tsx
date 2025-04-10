import HeaderItem from "./header-item/HeaderItem";

export default function Header() {
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
	return (
		<header>
			<ul>
				{userNav.map((el) => (
					<HeaderItem key={el.name} name={el.name} link={el.link} />
				))}
			</ul>
		</header>
	);
}
