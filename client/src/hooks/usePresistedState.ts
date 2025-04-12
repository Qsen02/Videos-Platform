import { useState } from "react";
import { UserForAuth } from "../types/user";
import { getUserData, getUserTheme, setUserTheme } from "../utils/userHelper";

export function usePresistedUser(initialValue: null) {
	const [user, setUser] = useState<UserForAuth | null>(() => {
		const isUser = getUserData();
		if (isUser) {
			return isUser;
		}

		return initialValue;
	});

	function setCurUser(value: UserForAuth | null) {
		setUser(value);
	}

	return {
		user,
		setCurUser,
	};
}

export function userPresistedTheme(initialValue: null) {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		const theme = getUserTheme();
		if (theme) {
			return theme;
		}

		return initialValue;
	});

	function changeCurTheme() {
		if (theme == "light") {
			setTheme("dark");
			setUserTheme("dark");
		} else if (theme == "dark") {
			setTheme("light");
			setUserTheme("light");
		}
	}

    return {
        theme,changeCurTheme
    }
}
