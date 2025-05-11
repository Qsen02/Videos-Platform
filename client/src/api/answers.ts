import { Answer } from "../types/answer";
import { Comment } from "../types/comment";
import { del, get, post, put } from "./requester";

const endpoint="answers";

export async function getAnswerById(answerId:string | undefined){
    const answer=await get(`${endpoint}/${answerId}`);
    return answer as Answer;
}

export async function createAnswer(commentId:string | undefined,data:object){
    const comment=await post(`${endpoint}/in/${commentId}`,data);
    return comment as Comment;
}

export async function editAnswer(answerId:string | undefined,data:object){
    const answer=await put(`${endpoint}/${answerId}`,data);
    return answer as Answer;
}

export async function deleteAnswer(answerId:string| undefined,commentId:string | undefined){
    const comment=await del(`${endpoint}/${answerId}/in/${commentId}`);
    return comment as Comment;
}

export async function likeAnswer(answerId:string){
    const comment=await post(`${endpoint}/${answerId}/like`,{});
    return comment as Comment;
}

export async function unlikeAnswer(answerId:string){
    const comment=await post(`${endpoint}/${answerId}/unlike`,{});
    return comment as Comment;
}