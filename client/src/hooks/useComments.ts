import { useEffect, useState } from "react";
import { createComment, deleteComment, editComment, getCommentById, likeComment, unlikeComment } from "../api/comments"
import { Comment } from "../types/comment";
import { useLoadingError } from "./useLoadingError";

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

export function useEditComment(){
    return async function(commentId:string | undefined,data:object){
        return await editComment(commentId,data);
    }
}

export function useGetOneComment(initialValue: {content:string} , commentId: string|undefined) {
    const [comment, setComment] = useState<Comment| {content:string}>(initialValue);
    const { loading, setLoading, error, setError } = useLoadingError(
        false,
        false
    );

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const comment = await getCommentById(commentId);
                setComment(comment);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        })();
    }, []);

    return {
        comment,loading,error
    }
}

export function useLikeComment(){
    return async function(commentId:string){
        return await likeComment(commentId)
    }
}

export function useUnlikeComment(){
    return async function(commentId:string){
        return await unlikeComment(commentId)
    }
}