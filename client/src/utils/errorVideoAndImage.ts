export function errorVideoImage(event:React.SyntheticEvent<HTMLImageElement, Event>){
    event.currentTarget.src="/assets/video-300x300.png";
}

export function errorProfileImage(event:React.SyntheticEvent<HTMLImageElement, Event>){
    event.currentTarget.src="/assets/profile.png";
}