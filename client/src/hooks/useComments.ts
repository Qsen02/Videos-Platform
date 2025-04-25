import { createComment, deleteComment } from "../api/comments"

export function useCreateComment(){
    return async function(videoId:string,data:object){
        return await createComment(videoId,data);
    }
}

export function useDeleteComment(){
    return async function(videoId:string,commentId:string | undefined){
        return await deleteComment(videoId,commentId)
    }
}