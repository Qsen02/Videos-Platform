import { FileType } from "./video";

export interface UserForAuth {
	_id: string;
	username: string;
	email: string;
	profileImage: FileType;
	accessToken: string;
}

export interface User {
	_id: string;
	username: string;
	email: string;
	profileImage: FileType;
	password: string;
	followers: User[];
	created_at: string;
}