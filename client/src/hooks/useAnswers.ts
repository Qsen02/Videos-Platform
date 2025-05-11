import { useEffect, useState } from "react";
import { Answer } from "../types/answer";
import { useLoadingError } from "./useLoadingError";
import { getCommentById } from "../api/comments";
import { User } from "../types/user";
import { createAnswer, deleteAnswer, editAnswer, getAnswerById } from "../api/answers";

export function useGetAllAnswers(initialValues: [], commentId: string | undefined) {
	const [answers, setAnswers] = useState<Answer[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);
    const [owner,setOwner]=useState<User | null>(null);

	useEffect(() => {
		(async () => {
            try{
                setLoading(true);
                const comment=await getCommentById(commentId);
                setAnswers(comment.answers);
                setOwner(comment.ownerId);
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError(true);
            }
        })();
	}, []);

    return {
        answers,setAnswers,owner,loading,error
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