import { useEffect, useState } from "react";
import { Video } from "../types/video";
import { useLoadingError } from "./useLoadingError";
import { getAllVideos } from "../api/videos";

export function useGetAllVideos(initialValue: []) {
	const [videos, setVideos] = useState<Video[]>(initialValue);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const videos = await getAllVideos();
                setVideos(videos);
                setLoading(false);
			} catch (err) {
                setError(true);
                setLoading(false);
            }
		})();
	}, []);

    return {
        videos,loading,error
    }
}
