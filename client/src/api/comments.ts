import { Comment } from "../types/comment";
import { Video } from "../types/video";
import { del, get, post, put } from "./requester";

const endpoint="comments";

export async function getCommentById(commentId:string | undefined){
    const comment=await get(`${endpoint}/${commentId}`);
    return comment as Comment;
}

export async function createComment(videoId:string,data:object){
    const comment=await post(`${endpoint}/in/${videoId}`,data);
    return comment as Video;
}

export async function deleteComment(videoId:string,commentId:string | undefined){
    const updatedVideo=await del(`${endpoint}/${commentId}/in/${videoId}`);
    return updatedVideo as Video;
}

export async function editComment(commentId:string | undefined,data:object){
    const updatedComment=await put(`${endpoint}/${commentId}`,data);
    return updatedComment as Video;
}

export async function likeComment(commentId:string){
    const comment=await post(`${endpoint}/like/${commentId}`,{});
    return comment as Video;
}

export async function unlikeComment(commentId:string){
    const comment=await post(`${endpoint}/unlike/${commentId}`,{});
    return comment as Video;
}