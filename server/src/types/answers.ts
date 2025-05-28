import { CommentType } from "./comments";
import { User } from "./users";

export interface Answer{
    _id:string;
    content:string;
    ownerId:User;
    commentId:CommentType;
    likes:User[];
    created_at:string;
}