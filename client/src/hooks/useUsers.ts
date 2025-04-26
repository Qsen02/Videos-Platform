import { useEffect, useState } from "react";
import { getUserById, login, register } from "../api/users"
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";

export function useRegister(){
    return async function registration(data:object){
        return await register(data);
    }
}

export function useLogin(){
    return async function logingin(data:object){
        return await login(data);
    }
}

export function useGetOneUser(initialValues:null, userId:string | undefined){
    const [user, setUser] = useState<User | null>(initialValues);
        const { loading, setLoading, error, setError } = useLoadingError(
            false,
            false
        );
    
        useEffect(() => {
            (async () => {
                try {
                    setLoading(true);
                    const curUser = await getUserById(userId);
                    setUser(curUser);
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    setLoading(false);
                }
            })();
        }, []);
    
        return {
            user,loading,error
        }
}
