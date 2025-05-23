import { useEffect, useState } from "react";
import {
	changePassword,
	editUser,
	followUser,
	getCreatedVideos,
	getFollwedUsers,
	getUserById,
	login,
	register,
    searchUsers,
    unfollowUser,
} from "../api/users";
import { User } from "../types/user";
import { useLoadingError } from "./useLoadingError";
import { Video } from "../types/video";

export function useRegister() {
	return async function registration(data: object) {
		return await register(data);
	};
}

export function useLogin() {
	return async function logingin(data: object) {
		return await login(data);
	};
}

export function useGetOneUser(initialValues: null, userId: string | undefined) {
	const [curUser, setUser] = useState<User | null>(initialValues);
	const [follwedUsers, setFollowedUsers] = useState<User[]>([]);
	const [createdVideos, setCreatedVideos] = useState<Video[]>([]);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const returnedUser = await getUserById(userId);
				setUser(returnedUser);
				const users = await getFollwedUsers(userId);
				setFollowedUsers(users);
				const videos = await getCreatedVideos(userId);
				setCreatedVideos(videos);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();
	}, []);

	return {
		curUser,
		setUser,
		follwedUsers,
		createdVideos,
		loading,
		error,
	};
}

export function useFollow() {
	return async function (userId: string | undefined) {
		return await followUser(userId);
	};
}

export function useUnfollow() {
	return async function (userId: string | undefined) {
		return await unfollowUser(userId);
	};
}

export function useEditUser(){
	return async function (userId:string,data:object){
		return await editUser(userId,data);
	}
}

export function useChangePassword(){
	return async function (userId:string | undefined,data:object){
		return await changePassword(userId,data);
	}
}

export function useGetFollowers(initialValues:[],userId:string | undefined){
	const [followers, setFollowers] = useState<User[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const returnedUsers = await getUserById(userId);
				setFollowers(returnedUsers.followers);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();
	}, []);

	return {
		followers,loading,error
	}
}

export function useGetFollowed(initialValues:[],userId:string | undefined){
	const [followed, setFollowed] = useState<User[]>(initialValues);
	const { loading, setLoading, error, setError } = useLoadingError(
		false,
		false
	);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const returnedUsers = await getFollwedUsers(userId);
				setFollowed(returnedUsers);
				setLoading(false);
			} catch (err) {
				setError(true);
				setLoading(false);
			}
		})();
	}, []);

	return {
		followed,loading,error
	}
}

export function useSearchUsers(){
	return async function (query:string){
		return await searchUsers(query);
	}
}
