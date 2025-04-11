import { createContext, useContext, useState } from "react";
import { UserThemeType } from "../types/UserAndTheme";

const UserThemeContext = createContext<UserThemeType | null>(null);

export default function UserThemeContextProvider(props: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	function changeTheme() {
		if (theme == "light") {
			setTheme("dark");
		} else if (theme == "dark") {
			setTheme("light");
		}
	}

	return (
		<UserThemeContext.Provider
			value={{ theme, changeTheme }}
		>
			{props.children}
		</UserThemeContext.Provider>
	);
}

export function useUserThemeContext() {
	const context = useContext(UserThemeContext);

	return {
		theme: context?.theme,
		changeTheme: context?.changeTheme,
	};
}
