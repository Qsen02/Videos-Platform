import { useEffect, useState } from "react";
import { Answer } from "../types/answer";
import { useLoadingError } from "./useLoadingError";
import { getCommentById } from "../api/comments";
import { createAnswer, deleteAnswer, editAnswer, getAnswerById, likeAnswer, unlikeAnswer } from "../api/answers";
import { Comment } from "../types/comment";

export function useGetAllAnswers(initialValues: null, commentId: string | undefined) {
	const [comment, setComment] = useState<Comment | null>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
            try{
                setLoading(true);
                const comment=await getCommentById(commentId);
                setComment(comment);
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(true);
            }
        })();
	}, []);

    return {
        comment,setComment,loading,error
    }
}

export function useCreateAnswer(){
    return async function (commentId:string | undefined,data:object){
        return await createAnswer(commentId,data);
    }
}

export function useDeleteAnswer(){
    return async function (answerId:string|undefined,commentId:string | undefined,){
        return await deleteAnswer(answerId,commentId);
    }
}

export function useEditAnswer(){
    return async function (answerId:string | undefined,data:object){
        return await editAnswer(answerId,data);
    }
}

export function useLikeAnswer(){
    return async function (answerId:string){
        return await likeAnswer(answerId);
    }
}

export function useUnlikeAnswer(){
    return async function (answerId:string){
        return await unlikeAnswer(answerId);
    }
}

export function useGetOneAnswer(initialValues:{content:string},answerId:string | undefined){
    const [answer, setAnswer] = useState<Answer | {content:string}>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
            try{
                setLoading(true);
                const answer=await getAnswerById(answerId);
                setAnswer(answer);
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(true);
            }
        })();
	}, []);

    return {
        answer,loading,error
    }
}