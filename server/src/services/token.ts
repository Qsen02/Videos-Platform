import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserAttributes } from "../types/users";
import { Document, Types } from "mongoose";

dotenv.config();

export function setToken(
    user: Document<
        unknown,
        {},
        {
            profileImage: string;
            followers: Types.ObjectId[];
            username?: string | null | undefined;
            email?: string | null | undefined;
            password?: string | null | undefined;
        }
    > & {
        profileImage: string;
        followers: Types.ObjectId[];
        username?: string | null | undefined;
        email?: string | null | undefined;
        password?: string | null | undefined;
    }
) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
    };

    if (process.env.SECRET) {
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "3d",
        });
        return token;
    } else {
        return null;
    }
}

export function validateToken(token: string) {
    if (process.env.SECRET) {
        const isValid = jwt.verify(token, process.env.SECRET) as UserAttributes;

        return isValid;
    } else {
        return null;
    }
}
