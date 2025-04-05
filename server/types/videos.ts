import { Comments } from "./comments";
import { User } from "./users";

export interface Videos{
    _id:string,
    title:string,
    videoUrl:string,
    description:string,
    likes:User[],
    dislikes:User[],
    comments:Comments[],
    ownerId:User
}