import { Answer } from "../types/answer";
import { Comment } from "../types/comment";
import { del, get, post, put } from "./requester";

const endpoint="answers";

export async function getAnswerById(answerId:string){
    const answer=await get(`${endpoint}/${answerId}`);
    return answer as Answer;
}

export async function createAnswer(commentId:string | undefined,data:object){
    const comment=await post(`${endpoint}/in/${commentId}`,data);
    return comment as Comment;
}

export async function editAnswer(answerId:string,data:object){
    const answer=await put(`${endpoint}/${answerId}`,data);
    return answer as Answer;
}

export async function deleteAnswer(answerId:string,commentId:string){
    const comment=await del(`${endpoint}/${answerId}/in/${commentId}`);
    return comment as Comment;
}

export async function likeAnswer(answerId:string){
    const answer=await post(`${endpoint}/${answerId}/like`,{});
    return answer as Answer;
}

export async function unlikeAnswer(answerId:string){
    const answer=await post(`${endpoint}/${answerId}/unlike`,{});
    return answer as Answer;
}