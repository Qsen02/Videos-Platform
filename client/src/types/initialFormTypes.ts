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
