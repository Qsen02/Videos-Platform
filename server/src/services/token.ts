import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserAttributes } from "../types/users";
import { Document, Types } from "mongoose";
import { FileType } from "../types/videos";

dotenv.config();

export function setToken(user:User) {
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
