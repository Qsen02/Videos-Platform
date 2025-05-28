import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
			type: String,
			default: "",
		},
		followers: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

const Users = mongoose.model("Users", userSchema);

export { Users };
