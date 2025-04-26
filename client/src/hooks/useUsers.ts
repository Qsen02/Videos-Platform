import { useEffect, useState } from "react";
import { getFollwedUsers, getUserById, login, register } from "../api/users"
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
    const [curUser, setUser] = useState<User | null>(initialValues);
    const [follwedUsers,setFollowedUsers]=useState<User[]>([]);
        const { loading, setLoading, error, setError } = useLoadingError(
            false,
            false
        );
    
        useEffect(() => {
            (async () => {
                try {
                    setLoading(true);
                    const returnedUser = await getUserById(userId);
                    setUser(returnedUser);
                    const users=await getFollwedUsers(userId);
                    console.log(users);
                    setFollowedUsers(users);
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    setLoading(false);
                }
            })();
        }, []);
    
        return {
            curUser,follwedUsers,loading,error
        }
}
