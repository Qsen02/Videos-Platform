export interface UserForAuth{
    _id:string,
    username:string,
    email:string,
    profileImage:string,
    accessToken:string
}

export interface User{
    _id:string;
    username:string;
    email:string;
    profileImage:string;
    password:string;
    followers:User[];
    created_at:string;
}