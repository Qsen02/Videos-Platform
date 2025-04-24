import { createComment } from "../api/comments"

export function useCreateComment(){
    return async function(videoId:string,data:object){
        return await createComment(videoId,data);
    }
}