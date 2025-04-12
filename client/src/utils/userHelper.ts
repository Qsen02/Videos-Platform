import { UserForAuth } from "../types/user";

export function setUserData(user: UserForAuth | null) {
	localStorage.setItem("user", JSON.stringify(user));
}

export function getUserData() {
	const user = localStorage.getItem("user");
	if (user) {
		return JSON.parse(user);
	}
	return null;
}

export function removeUserData(){
    localStorage.removeItem("user");
}

export function setUserTheme(theme:string){
	localStorage.setItem("theme",JSON.stringify(theme));
}

export function getUserTheme(){
	const theme = localStorage.getItem("theme");
	if (theme) {
		return JSON.parse(theme);
	}
	return null;
}

export function removeUserTheme(){
	localStorage.removeItem("theme");
}
