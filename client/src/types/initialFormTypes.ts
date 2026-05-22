export interface EditFormTypes {
	title: string;
	videoUrl: File | null;
	thumbnail: File | null;
	description: string;
}

export interface RegisterFormTypes {
	username: string;
	email: string;
	profileImage: File | null;
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
	profileImage: File | null;
}

export interface ChangePasswordFormTypes{
	newPassword:string
}