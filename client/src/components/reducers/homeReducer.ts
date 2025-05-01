import { ActionType, Video } from "../../types/video";

export const homeReducer:React.Reducer<Video[],ActionType>=(state,action)=>{
    switch(action.type){
        case "getAll":
            return action.payload.slice();
        case "searchVideos":
            return action.payload.slice();
        case "getNext":
            return action.payload(state);
        default:
            return state;
    }
}