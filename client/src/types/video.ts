import { Comment } from "./comment";
import { User } from "./user";

export interface Video {
	_id: string;
	title: string;
	videoUrl: string;
	description: string;
	thumbnail:string;
	likes: User[];
	dislikes: User[];
	comments: Comment[];
	ownerId: User;
}
