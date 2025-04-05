import { User } from "./users";

export interface Comments {
    _id:string,
    content:string,
    ownerId:User,
    likes:User[]
}