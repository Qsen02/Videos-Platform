import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		ownerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Users",
		},
		content: {
			type: String,
			require: true,
		},
		likes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			default: [],
		},
		videoId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Videos",
		},
		answers: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Answers",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

const Comments = mongoose.model("Comments", commentSchema);

export { Comments };
