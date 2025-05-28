import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		videoUrl: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		thumbnail: {
			type: String,
		},
		likes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			deafult: [],
		},
		dislikes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			deafult: [],
		},
		comments: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Comments",
			deafult: [],
		},
		ownerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

const Videos = mongoose.model("Videos", videoSchema);

export { Videos };
