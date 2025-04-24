import { useEffect, useReducer, useState } from "react";
import { ActionType, Video } from "../types/video";
import { useLoadingError } from "./useLoadingError";
import {
	createVideo,
	deleteVideo,
	dislikeVideo,
	editVideo,
	getAllVideos,
	getVideoById,
	likeVideo,
	searchVideos,
	undislikeVideo,
	unlikeVideo,
} from "../api/videos";
import { homeReducer } from "../components/reducers/homeReducer";
import { EditFormTypes } from "../types/initialFormTypes";

export function useGetAllVideos(initialValue: []) {
	const [videos, setVideos] = useReducer<React.Reducer<Video[], ActionType>>(
		homeReducer,
		initialValue
	);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const videos = await getAllVideos();
				setVideos({ type: "getAll", payload: videos });
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();
	}, []);

	return {
		videos,
		setVideos,
		loading,
		setLoading,
		error,
		setError,
	};
}

export function useSearchVideos() {
	return async function searching(query: string) {
		return await searchVideos(query);
	};
}

export function useCreateVideo() {
	return async function creatingVideo(data: object) {
		return await createVideo(data);
	};
}

export function useGetOneVideo(initialValue: Video , videoId: string|undefined) {
	const [video, setVideo] = useState<Video>(initialValue);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const video = await getVideoById(videoId);
				setVideo(video);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();
	}, []);

	return {
		video,setVideo,loading,error
	}
}

export function useDeleteVideo(){
	return async function(videoId:string){
		return await deleteVideo(videoId);
	}
}


export function useEditVideo(){
	return async function(videoId:string,data:object){
		return await editVideo(videoId,data)
	}
}

export function useLikeVideo(){
	return async function(videoId:string | undefined | null){
		return await likeVideo(videoId);
	}
}

export function useDislikeVideo(){
	return async function(videoId:string | undefined | null){
		return await dislikeVideo(videoId);
	}
}

export function useUndislikeVideo(){
	return async function(videoId:string | undefined | null){
		return await undislikeVideo(videoId);
	}
}

export function useUnlikeVideo(){
	return async function(videoId:string | undefined | null){
		return await unlikeVideo(videoId);
	}
}