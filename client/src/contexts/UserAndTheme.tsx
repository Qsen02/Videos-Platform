import { createContext, useContext } from "react";
import { UserThemeType } from "../types/UserAndTheme";
import { usePresistedUser, userPresistedTheme } from "../hooks/usePresistedState";
import { UserForAuth } from "../types/user";
import { removeUserData, setUserData } from "../utils/userHelper";
import { logout } from "../api/users";

const UserThemeContext = createContext<UserThemeType | null>(null);

export default function UserThemeContextProvider(props: {
	children: React.ReactNode;
}) {
	const {theme,changeCurTheme}=userPresistedTheme("light");
	const {user,setCurUser}=usePresistedUser(null);

	function changeTheme() {
		changeCurTheme();
	}

	function setUser(user:UserForAuth){
		setUserData(user);
		setCurUser(user);
	}

	async function removeUser(){
		await logout();
		removeUserData();
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
