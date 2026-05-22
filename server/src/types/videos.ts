import { Types } from "mongoose";

export interface FileType {
	imageUrl: string;
	publicId: string;
}

export interface VideosType {
	_id: string;
	title: string;
	videoUrl: FileType;
	description: string;
	thumbnail: FileType;
	likes: Types.ObjectId[];
	dislikes: Types.ObjectId[];
	comments: Types.ObjectId[];
	ownerId: Types.ObjectId;
	created_at: string;
}