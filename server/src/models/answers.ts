import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			require: true,
		},
		ownerId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Users",
		},
		commentId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Comments",
		},
		likes: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "Users",
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

const Answers = mongoose.model("Answers", answerSchema);

export { Answers };
