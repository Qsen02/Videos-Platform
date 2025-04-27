export interface EditFormTypes {
	title: string;
	videoUrl: string;
	thumbnail: string;
	description: string;
}

export interface RegisterFormTypes {
	username: string;
	email: string;
	profileImage: string;
	password: string;
	repass: string;
}

export interface LoginFormTypes {
	username: string;
	password: string;
}

export interface CommentFormTypes{
	content:string;
}

export interface EditUserFormTypes{
	username:string | undefined;
	email:string | undefined;
	profileImage:string | undefined;
}

export interface ChangePasswordFormTypes{
	newPassword:string
}