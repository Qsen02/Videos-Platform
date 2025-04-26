import { User, UserForAuth } from "../types/user";
import { Video } from "../types/video";
import { get, post, put } from "./requester";

const endpoint="users";

export async function getUserById(userId:string | undefined){
    const user=await get(`${endpoint}/${userId}`);
    return user as User;
}

export async function register(data:object){
    const user=await post(`${endpoint}/register`,data);
    return user as UserForAuth;
}

export async function login(data:object){
    const user=await post(`${endpoint}/login`,data);
    return user as UserForAuth;
}

export async function logout(){
    await get(`${endpoint}/logout`);
}

export async function followUser(userId:string){
    const user=await post(`${endpoint}/follow/${userId}`,{});
    return user as User;
}

export async function unfollowUser(userId:string){
    const user=await post(`${endpoint}/unfollow/${userId}`,{});
    return user as User;
}

export async function editUser(userId:string,data:object){
    const updatedUser=await put(`${endpoint}/edit/${userId}`,data);
    return updatedUser as User;
}

export async function changePassword(userId:string,data:object){
    const updatedUser=await put(`${endpoint}/change-password/${userId}`,data);
    return updatedUser as User;
}

export async function getFollwedUsers(userId:string | undefined){
    const follwedUsers=await get(`${endpoint}/follwedUsers/${userId}`);
    return follwedUsers as User[];
}

export async function getCreatedVideos(userId:string | undefined){
    const createdVideos=await get(`${endpoint}/created-videos/${userId}`);
    return createdVideos as Video[];
}