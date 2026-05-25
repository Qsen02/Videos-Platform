import mongoose from "mongoose";
import { VideosType } from "../types/videos";

const videoSchema = new mongoose.Schema<VideosType>(
	{
		title: {
			type: String,
			require: true,
		},
		videoUrl: {
			imageUrl: {
				type: String,
				required: true,
			},
			publicId: {
				type: String,
				required: true,
			},
		},
		description: {
			type: String,
			require: true,
		},
		thumbnail: {
			imageUrl: {
				type: String,
				required: true,
			},
			publicId: {
				type: String,
				required: true,
			},
		},
		likes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			default: [],
		},
		dislikes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			dеfault: [],
		},
		comments: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Comments",
			default: [],
		},
		ownerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: { createdAt: "created_at" } },
);

const Videos = mongoose.model("Videos", videoSchema);

export { Videos };
