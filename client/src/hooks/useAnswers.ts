import { useEffect, useState } from "react";
import { Answer } from "../types/answer";
import { useLoadingError } from "./useLoadingError";
import { getCommentById } from "../api/comments";
import { User } from "../types/user";
import { createAnswer, deleteAnswer } from "../api/answers";

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