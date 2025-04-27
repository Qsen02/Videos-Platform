import { User } from "./user";
import { Video } from "./video";

export interface VideoOutletContextType {
	videoId: string;
	video: Video;
	setVideo: React.Dispatch<React.SetStateAction<Video>>;
	loading: boolean;
	error: boolean;
}

export interface UserOutletContextType{
	setUserState:React.Dispatch<React.SetStateAction<User | null>>;
	userId:string;
	loading:boolean;
	error:boolean;
}