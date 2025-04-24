import { Comment } from "./comment";
import { User } from "./user";

export interface Video {
	_id: string;
	title: string;
	videoUrl: string;
	description: string;
	thumbnail: string;
	likes: string[];
	dislikes: string[];
	comments: Comment[];
	ownerId: User;
}

export interface ActionType {
	type: "getAll" | "searchVideos";
	payload: Video[] | [];
}
