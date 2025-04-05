import { User } from "./users";

export interface CommentType {
    _id:string,
    content:string,
    ownerId:User,
    likes:User[]
}