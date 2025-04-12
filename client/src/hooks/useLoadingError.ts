import { useState } from "react";

export function useLoadingError(initialLoading:boolean,initialError:boolean){
    const [loading,setLoading]=useState(initialLoading);
    const [error,setError]=useState(initialError);

    return {
        loading,setLoading,error,setError
    }
}