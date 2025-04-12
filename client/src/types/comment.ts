import { User } from "./user";

export interface Comment {
	_id: string;
	content: string;
	ownerId: User;
	likes: User[];
}
