export interface User {
    _id:string,
    username: string;
    email: string;
    password: string;
    profileImage: string;
    followers: User[];
}

export interface UserAttributes{
    _id:string,
    username: string;
    email: string;
    profileImage: string;
}
