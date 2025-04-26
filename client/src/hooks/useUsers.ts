import { useEffect, useState } from "react";
import { getCreatedVideos, getFollwedUsers, getUserById, login, register } from "../api/users"
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { Video } from "../types/video";

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
    const [createdVideos,setCreatedVideos]=useState<Video[]>([]);
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
                    setFollowedUsers(users);
                    const videos=await getCreatedVideos(userId);
                    setCreatedVideos(videos);
                    setLoading(false);
                } catch (err) {
                    setError(true);
                    setLoading(false);
                }
            })();
        }, []);
    
        return {
            curUser,follwedUsers,createdVideos,loading,error
        }
}
