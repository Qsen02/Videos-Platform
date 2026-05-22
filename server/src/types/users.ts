import { Types } from "mongoose";
import { FileType } from "./videos";

export interface User {
	_id: string;
	username: string;
	email: string;
	password: string;
	profileImage: FileType;
	followers: Types.ObjectId[];
	created_at: string;
}

export interface UserAttributes {
	_id: string;
	username: string;
	email: string;
	profileImage: {
		imageURL: string;
		publicId: string;
	};
}
