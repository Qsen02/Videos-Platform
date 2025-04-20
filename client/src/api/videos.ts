import { Video } from "../types/video";
import { del, get, post, put } from "./requester";

const endpoint="videos";

export async function getAllVideos(){
    const videos=await get(`${endpoint}`);
    return videos as Video[];
}

export async function getVideoById(videoId:string|undefined){
    const video=await get(`${endpoint}/${videoId}`);
    return video as Video;
}

export async function searchVideos(query:string){
    const videos=await get(`${endpoint}/search/${query}`);
    return videos as Video[];
}

export async function pagination(page:number){
    const videos=await get(`${endpoint}/page/${page}`);
    return videos as Video[];
}

export async function createVideo(data:object){
    const video=await post(`${endpoint}`,data);
    return video as Video;
}

export async function deleteVideo(videoId:string){
    await del(`${endpoint}/${videoId}`);
}

export async function editVideo(videoId:string,data:object){
    const updatedVideo=await put(`${endpoint}/${videoId}`,data);
    return updatedVideo as Video;
}

export async function likeVideo(videoId:string){
    const  updatedVideo=await post(`${endpoint}/like/${videoId}`,{});
    return updatedVideo as Video;
}

export async function unlikeVideo(videoId:string){
    const  updatedVideo=await post(`${endpoint}/unlike/${videoId}`,{});
    return updatedVideo as Video;
}

export async function dislikeVideo(videoId:string){
    const  updatedVideo=await post(`${endpoint}/dislike/${videoId}`,{});
    return updatedVideo as Video;
}

export async function undislikeVideo(videoId:string){
    const  updatedVideo=await post(`${endpoint}/undislike/${videoId}`,{});
    return updatedVideo as Video;
}
