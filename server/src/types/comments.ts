import { Answer } from "./answers";
import { User } from "./users";

export interface CommentType {
    _id:string;
    content:string;
    ownerId:User;
    likes:User[];
    answers:Answer[];
    created_at:string;
}