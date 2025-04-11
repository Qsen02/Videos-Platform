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

export function removeUserData(key:string){
    localStorage.removeItem(key);
}
