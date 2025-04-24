import { Video } from "./video";

export interface OutletContextType {
	videoId: string;
	video: Video;
	setVideo: React.Dispatch<React.SetStateAction<Video>>;
	loading: boolean;
	error: boolean;
}
