import { UserForAuth } from "./user";

export interface UserThemeType {
	theme: "light" | "dark";
	changeTheme: () => void;
	user: UserForAuth | null;
	setUser: (user: UserForAuth) => void;
	removeUser: () => Promise<void>;
}
