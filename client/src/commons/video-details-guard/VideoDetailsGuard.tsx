import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";
import { VideoOutletContextType } from "../../types/outletContext";

export default function VideoDetailsGuard() {
	const { user } = useUserThemeContext();
	const { videoId, video, setVideo, loading, error } =
		useOutletContext<VideoOutletContextType>();
	return (
		<>
			{!user ? (
				<Navigate to="/login" />
			) : (
				<Outlet
					context={{ videoId, video, setVideo, loading, error }}
				/>
			)}
		</>
	);
}
