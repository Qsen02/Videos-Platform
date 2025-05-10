import { Router } from "express";
import {
	checkAnswerId,
	createAnswer,
	deleteAnswer,
	editAnswer,
	getAnswerById,
	likeAnswer,
	unlikeAnswer,
} from "../services/answers";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { checkCommentId } from "../services/comments";
import { errorParser } from "../utils/errorParsers";
import { MyRequest } from "../types/express";

const answerRouter = Router();

answerRouter.get("/:answerId", async (req, res) => {
	try {
		const answerId = req.params.answerId;
		const answer = await getAnswerById(answerId);
		res.json(answer);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json(err.message);
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

answerRouter.post(
	"/in/:commentId",
	isUser(),
	body("content")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Content must be at least 1 symbol long!"),
	async (req: MyRequest, res) => {
		const content = req.body.content;
		const commentId = req.params.commentId;
		const isValid = await checkCommentId(commentId);
		const user = req.user;
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedComment = await createAnswer(
				user?._id,
				commentId,
				content
			);
			res.status(201).json(updatedComment);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json(err.message);
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

answerRouter.delete("/:answerId/in/:commentId", isUser(), async (req, res) => {
	const commentId = req.params.commentId;
	const answerId = req.params.answerId;
	const isValidAnswer = await checkAnswerId(answerId);
	const isValidComment = await checkCommentId(commentId);
	if (!isValidComment || !isValidAnswer) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedComment = await deleteAnswer(answerId, commentId);
	res.json(updatedComment);
});

answerRouter.put(
	"/:answerId",
	isUser(),
	body("content")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Content must be at least 1 symbol long!"),
	async (req: MyRequest, res) => {
		const content = req.body.content;
		const answerId = req.params.answerId;
		const isValid = await checkAnswerId(answerId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedAnswer = await editAnswer(answerId, content);
			res.json(updatedAnswer);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json(err.message);
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	}
);

answerRouter.post("/:answerId/like", isUser(), async (req: MyRequest, res) => {
	const answerId = req.params.answerId;
	const user = req.user;
	const isValid = await checkAnswerId(answerId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedAnswer = await likeAnswer(user?._id, answerId);
	res.json(updatedAnswer);
});

answerRouter.post(
	"/:answerId/unlike",
	isUser(),
	async (req: MyRequest, res) => {
		const answerId = req.params.answerId;
		const user = req.user;
		const isValid = await checkAnswerId(answerId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		const updatedAnswer = await unlikeAnswer(user?._id, answerId);
		res.json(updatedAnswer);
	}
);

export { answerRouter };
