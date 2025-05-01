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

export type ActionType =
	| { type: "getAll"; payload: Video[] | [] }
	| { type: "searchVideos"; payload: Video[] | [] }
	| { type: "getNext"; payload: (curVideos: Video[]) => Video[] | [] };
