import { Comment } from "./comment";
import { User } from "./user";

export interface Answer {
    _id:string,
    content:string,
    ownerId:User,
    commentId:Comment,
    likes:User[]
}