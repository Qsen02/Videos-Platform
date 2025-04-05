import { UserAttributes } from "../../types/users";
import { Users } from "../models/users";
import bcrypt from "bcrypt";
import { Videos } from "../models/videos";

export async function register(
    username: string,
    email: string,
    password: string
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
        profileImage: "",
    });

    return newUser;
}

export async function login(username: string, password: string) {
    const user = await Users.findOne({ username: username }).lean();
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
    curUser: UserAttributes,
    followingUserId: string
) {
    const updatedUser = await Users.findByIdAndUpdate(
        followingUserId,
        { $push: { followers: curUser._id } },
        { new: true }
    );

    return updatedUser;
}

export async function unfollowUser(
    curUser: UserAttributes,
    unfollowingUserId: string
) {
    const updatedUser = await Users.findByIdAndUpdate(
        unfollowingUserId,
        { $pull: { followers: curUser._id } },
        { new: true }
    );

    return updatedUser;
}

export async function getCreatedVideos(userId:string){
    const videos=await Videos.find({ownerId:userId});

    return videos;
}
