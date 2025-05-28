import { CommentType } from "./comments";
import { User } from "./users";

export interface VideosType{
    _id:string;
    title:string;
    videoUrl:string;
    description:string;
    thumbnail:string;
    likes:User[];
    dislikes:User[];
    comments:CommentType[];
    ownerId:User;
    created_at:string;
}