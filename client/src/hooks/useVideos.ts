import { useEffect, useReducer, useRef, useState } from "react";
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
	pagination,
	searchVideos,
	undislikeVideo,
	unlikeVideo,
} from "../api/videos";
import { homeReducer } from "../components/reducers/homeReducer";
import { User } from "../types/user";

export function useGetAllVideos(initialValue: []) {
	const [videos, setVideos] = useReducer<React.Reducer<Video[], ActionType>>(
		homeReducer,
		initialValue
	);
	const [pages, setPages] = useState(1);
	const [users, setUsers] = useState<User[] | null>(null);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);
	const [isSearched, setIsSearched] = useState(false);
	const [isOver, setIsOver] = useState(false);
	const [typed, setTyped] = useState(false);
	const [typedVideos, setTypedVideos] = useState<Video[]>([]);
	const [typedUsers, setTypedUsers] = useState<User[]>([]);
	const pagesRef = useRef(pages);
	const isOverRef = useRef(isOver);
	const isSearchedRef = useRef(isSearched);

	useEffect(() => {
		pagesRef.current = pages;
	}, [pages]);

	useEffect(() => {
		isOverRef.current = isOver;
	}, [isOver]);

	useEffect(() => {
		isSearchedRef.current = isSearched;
	}, [isSearched]);

	async function onScroll() {
		const curPosition = window.innerHeight + window.scrollY;
		const max = document.documentElement.scrollHeight;
		if (curPosition >= max) {
			if (!isOverRef.current && !isSearchedRef.current) {
				try {
					setPages((value) => value + 1);
					setLoading(true);
					const nexVideos = await pagination(pagesRef.current);
					if (nexVideos.length == 0) {
						setIsOver(true);
					} else {
						setVideos({
							type: "getNext",
							payload: (curVideos) => [
								...curVideos,
								...nexVideos,
							],
						});
					}
					setLoading(false);
				} catch (err) {
					setLoading(false);
					setError(true);
				}
			}
		}
	}

	useEffect(() => {
		(async () => {
			try {
				window.addEventListener("scroll", onScroll);
				setLoading(true);
				const videos = await getAllVideos();
				setVideos({ type: "getAll", payload: videos });
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();

		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return {
		videos,
		setVideos,
		users,
		setUsers,
		isSearchedRef,
		setIsSearched,
		typed,
		setTyped,
		typedVideos,
		setTypedVideos,
		typedUsers,
		setTypedUsers,
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

export function useGetOneVideo(
	initialValue: Video,
	videoId: string | undefined
) {
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
		video,
		setVideo,
		loading,
		error,
	};
}

export function useDeleteVideo() {
	return async function (videoId: string) {
		return await deleteVideo(videoId);
	};
}

export function useEditVideo() {
	return async function (videoId: string, data: object) {
		return await editVideo(videoId, data);
	};
}

export function useLikeVideo() {
	return async function (videoId: string | undefined | null) {
		return await likeVideo(videoId);
	};
}

export function useDislikeVideo() {
	return async function (videoId: string | undefined | null) {
		return await dislikeVideo(videoId);
	};
}

export function useUndislikeVideo() {
	return async function (videoId: string | undefined | null) {
		return await undislikeVideo(videoId);
	};
}

export function useUnlikeVideo() {
	return async function (videoId: string | undefined | null) {
		return await unlikeVideo(videoId);
	};
}
