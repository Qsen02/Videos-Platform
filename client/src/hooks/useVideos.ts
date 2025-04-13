import { useEffect, useReducer } from "react";
import { ActionType, Video } from "../types/video";
import { useLoadingError } from "./useLoadingError";
import { getAllVideos } from "../api/videos";
import { homeReducer } from "../components/reducers/homeReducer";

export function useGetAllVideos(initialValue: []) {
	const [videos, setVideos] = useReducer<
		React.Reducer<Video[], ActionType>
	>(homeReducer, initialValue);
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
		loading,
		error,
	};
}
