import { User, UserAttributes } from "../types/users";
import { Users } from "../models/users";
import bcrypt from "bcrypt";
import { Videos } from "../models/videos";

export async function register(
	username: string,
	email: string,
	password: string,
	profileImage?: string
) {
	const isUsernameExist = await Users.findOne({ username: username }).lean();
	if (isUsernameExist) {
		throw new Error("User with this username already exist!");
	}
	const isEmailExist = await Users.findOne({ email: email }).lean();
	if (isEmailExist) {
		throw new Error("User with this email already exist!");
	}
	const newUser = await Users.create({
		username: username,
		email: email,
		password: await bcrypt.hash(password, 10),
		profileImage: profileImage || "",
	});

	return newUser;
}

export async function login(username: string, password: string) {
	const user = await Users.findOne({ username: username });
	if (!user) {
		throw new Error("Username or password don't match!");
	}
	const isValidPassword = await bcrypt.compare(password, user.password!);
	if (!isValidPassword) {
		throw new Error("Username or password don't match!");
	}

	return user;
}

export async function followUser(
	curUser: UserAttributes | null | undefined,
	followingUserId: string
) {
	const updatedUser = await Users.findByIdAndUpdate(
		followingUserId,
		{ $push: { followers: curUser?._id } },
		{ new: true }
	).populate("followers");

	return updatedUser;
}

export async function unfollowUser(
	curUser: UserAttributes | null | undefined,
	unfollowingUserId: string
) {
	const updatedUser = await Users.findByIdAndUpdate(
		unfollowingUserId,
		{ $pull: { followers: curUser?._id } },
		{ new: true }
	).populate("followers");

	return updatedUser;
}

export async function getCreatedVideos(userId: string) {
	const videos = await Videos.find({ ownerId: userId }).populate("ownerId").lean();

	return videos;
}

export async function getUserById(userId: string) {
	const user = await Users.findById(userId).populate("followers").lean();
	if (!user) {
		throw new Error("Resource not found!");
	}
	return user;
}

export async function checkUserId(userId: string) {
	const user = await Users.findById(userId).lean();
	if (!user) {
		return false;
	}

	return true;
}

export async function editUser(userId: string, data: Partial<User>) {
	const updatedUser = await Users.findByIdAndUpdate(
		userId,
		{
			$set: data,
		},
		{ new: true }
	).lean();

	return updatedUser;
}

export async function changePassword(userId: string, newPassword: string) {
	const user = await Users.findById(userId).lean();
	const isOldPassword = await bcrypt.compare(newPassword, user?.password!);
	if (isOldPassword) {
		throw new Error("Old password can't be the new password!");
	}
	const updatedUser = await Users.findByIdAndUpdate(
		userId,
		{
			$set: { password: await bcrypt.hash(newPassword, 10) },
		},
		{ new: true }
	).lean();

	return updatedUser;
}

export async function searchUsers(name: string) {
	const users = await Users.find({ username: new RegExp(name, "i") }).lean();
	return users;
}

export async function getFollwedUsers(userId: string) {
	const users = await Users.find().populate("followers").lean();
	const follwedUsers = users.filter((el) =>
		el.followers.map((el) => el._id.toString()).includes(userId)
	);
	return follwedUsers;
}