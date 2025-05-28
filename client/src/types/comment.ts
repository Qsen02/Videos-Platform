import { Answer } from "./answer";
import { User } from "./user";
import { Video } from "./video";

export interface Comment {
	_id: string;
	content: string;
	ownerId: User;
	likes: string[];
	videoId:Video;
	answers:Answer[];
	created_at:string;
}
