import { useParams } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { useGetOneVideo } from "../../hooks/useVideos";

export default function VideoDetails() {
	const { theme } = useUserThemeContext();
	const { videoId } = useParams();
	const { video, loading, error } = useGetOneVideo(null, videoId);

	return (
		<div>
			<h2>Video details works! {videoId}</h2>
		</div>
	);
}
