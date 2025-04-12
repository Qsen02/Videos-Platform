import { createContext, useContext, useState } from "react";
import { UserThemeType } from "../types/UserAndTheme";
import { usePresistedState } from "../hooks/usePresistedState";
import { UserForAuth } from "../types/user";
import { removeUserData, setUserData } from "../utils/userHelper";
import { logout } from "../api/users";

const UserThemeContext = createContext<UserThemeType | null>(null);

export default function UserThemeContextProvider(props: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const {user,setCurUser}=usePresistedState(null);

	function changeTheme() {
		if (theme == "light") {
			setTheme("dark");
		} else if (theme == "dark") {
			setTheme("light");
		}
	}

	function setUser(user:UserForAuth){
		setUserData(user);
		setCurUser(user);
	}

	async function removeUser(){
		await logout();
		removeUserData("user");
		setCurUser(null);
	}

	return (
		<UserThemeContext.Provider
			value={{ theme, changeTheme,user,setUser,removeUser }}
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
		user:context?.user,
		setUser:context?.setUser,
		removeUser:context?.removeUser
	};
}
