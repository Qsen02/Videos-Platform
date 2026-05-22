import { Comment } from "./comment";
import { User } from "./user";

export interface FileType {
	imageUrl: string;
	publicId: string;
}

export interface Video {
	_id: string;
	title: string;
	videoUrl: FileType;
	description: string;
	thumbnail: FileType;
	likes: string[];
	dislikes: string[];
	comments: Comment[];
	ownerId: User;
	created_at: string;
}

export type ActionType =
	| { type: "getAll"; payload: Video[] | [] }
	| { type: "searchVideos"; payload: Video[] | [] }
	| { type: "getNext"; payload: (curVideos: Video[]) => Video[] | [] };
