import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserAttributes } from "../../types/users";

dotenv.config();

export function setToken(user: User) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
    };

    const token = jwt.sign(payload, process.env.SECRET!, {
        expiresIn: "3d",
    });

    return token;
}

export function validateToken(token: string) {
    const isValid = jwt.verify(token, process.env.SECRET!) as UserAttributes;

    return isValid;
}
