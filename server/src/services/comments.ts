import { Answers } from "../models/answers";
import { Comments } from "../models/comments";
import { Videos } from "../models/videos";

export async function getCommentById(commentId: string | undefined) {
	const comment = await Comments.findById(commentId)
		.populate("ownerId","username profileImage")
		.populate({
			path: "answers",
			populate: {
				path: "ownerId",
				model: "Users",
			},
		})
		.lean();
	if (!comment) {
		throw new Error("Resource not found!");
	}
	return comment;
}

export async function checkCommentId(commentId: string) {
	const user = await Comments.findById(commentId).lean();
	if (!user) {
		return false;
	}

	return true;
}

export async function createComment(
	userId: string | null | undefined,
	videoId: string,
	content: string
) {
	const newComment = await Comments.create({
		ownerId: userId,
		videoId: videoId,
		content: content,
	});

	await Videos.findByIdAndUpdate(
		videoId,
		{
			$push: { comments: newComment._id },
		}
	)

	const populatedComment = await Comments.findById(newComment._id)
		.populate("ownerId", "username profileImage")
		.lean();

	return populatedComment;
}

export async function deleteComment(videoId: string, commentId: string) {
	const comment = await Comments.findById(commentId);
	await Videos.findByIdAndUpdate(
		videoId,
		{ $pull: { comments: commentId } },
		{ new: true }
	)
	await Answers.deleteMany({ commentId: comment?._id });
	await comment?.deleteOne();
	return comment;
}

export async function editComment(commentId: string, newContent: string) {
	const updatedComment = await Comments.findByIdAndUpdate(
		commentId,
		{
			$set: { content: newContent },
		},
		{ new: true }
	)
		.populate("ownerId","username profileImage")
		.lean();

	return updatedComment;
}

export async function likeComment(
	userId: string | null | undefined,
	commentId: string
) {
	const updatedComment = await Comments.findByIdAndUpdate(
		commentId,
		{
			$push: { likes: userId },
		},
		{ new: true }
	)
		.populate("ownerId","username profileImage")
		.lean();

	return updatedComment;
}

export async function unlikeComment(
	userId: string | null | undefined,
	commentId: string
) {
	const updatedComment = await Comments.findByIdAndUpdate(
		commentId,
		{
			$pull: { likes: userId },
		},
		{ new: true }
	)
		.populate("ownerId","username profileImage")
		.lean();

	return updatedComment;
}
