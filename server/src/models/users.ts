import mongoose from "mongoose";
import { User } from "../types/users";

const userSchema = new mongoose.Schema<User>(
	{
		username: {
			type: String,
			require: true,
			unique: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		profileImage: {
			imageUrl: {
				type: String,
				required: true,
			},
			publicId: {
				type: String,
				required: true,
			},
		},
		followers: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at" } },
);

const Users = mongoose.model("Users", userSchema);

export { Users };
