import { Answers } from "../models/answers";
import { Comments } from "../models/comments";

export async function getAnswerById(answerId: string) {
	const answer = await Answers.findById(answerId)
		.populate("ownerId")
		.populate("commentId")
		.lean();
	if (!answer) {
		throw new Error("Resource not found!");
	}
	return answer;
}

export async function createAnswer(
	userId: string | undefined,
	commentId: string,
	content: string
) {
	const newAnswer = await Answers.create({
		ownerId: userId,
		content: content,
		commentId: commentId,
	});

	const updatedComment = await Comments.findByIdAndUpdate(
		commentId,
		{
			$push: { answers: newAnswer._id },
		},
		{ new: true }
	)
		.populate({
			path: "answers",
			populate: {
				path: "ownerId",
				model: "Users",
			},
		})
		.populate("ownerId")
		.lean();

	return updatedComment;
}

export async function editAnswer(answerId: string, content: string) {
	const updatedAnswer = await Answers.findByIdAndUpdate(
		answerId,
		{ $set: { content: content } },
		{ new: true }
	)
		.populate("ownerId")
		.populate("commentId")
		.lean();
	return updatedAnswer;
}

export async function deleteAnswer(answerId: string, commentId: string) {
	await Answers.findByIdAndDelete(answerId);
	const updatedComment = await Comments.findByIdAndUpdate(
		commentId,
		{
			$pull: { answers: answerId },
		},
		{ new: true }
	)
		.populate("ownerId")
		.populate("answers")
		.lean();
	return updatedComment;
}

export async function likeAnswer(userId: string | undefined, answerId: string) {
	const updatedAnswer = await Answers.findByIdAndUpdate(
		answerId,
		{
			$push: { likes: userId },
		},
		{ new: true }
	)
		.populate("ownerId")
		.populate("commentId")
		.lean();
	return updatedAnswer;
}

export async function unlikeAnswer(
	userId: string | undefined,
	answerId: string
) {
	const updatedAnswer = await Answers.findByIdAndUpdate(
		answerId,
		{
			$pull: { likes: userId },
		},
		{ new: true }
	)
		.populate("ownerId")
		.populate("commentId")
		.lean();
	return updatedAnswer;
}

export async function checkAnswerId(answerId: string) {
	const user = await Answers.findById(answerId).lean();
	if (!user) {
		return false;
	}

	return true;
}
