import { Router } from "express";
import { checkCommentId, createComment, deleteComment, editComment, getCommentById, likeComment, unlikeComment } from "../services/comments";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { MyRequest } from "../types/express";
import { checkVideoId } from "../services/videos";
import { errorParser } from "../utils/errorParsers";

const commentRouter = Router();

commentRouter.get("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await getCommentById(commentId);
        res.json(comment);
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Error occurd!" });
        }
        return;
    }
});

commentRouter.post(
    "/in/:videoId",
    isUser(),
    body("content")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Content of the comment can't be empty!"),
    async (req: MyRequest, res) => {
        const content = req.body.content;
        const user = req.user;
        const videoId = req.params.videoId;
        const isValid = await checkVideoId(videoId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newComment=await createComment(user?._id,videoId,content);
            res.json(newComment);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({ message: "Error occurd!" });
            }
            return;
        }
    }
);

commentRouter.delete("/:commentId/in/:videoId",isUser(),async(req,res)=>{
    const videoId=req.params.videoId;
    const commentId=req.params.commentId;
    const isValidVideo = await checkVideoId(videoId);
    const isValidComment = await checkCommentId(commentId);
    if (!isValidVideo || !isValidComment) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const updatedVideo=await deleteComment(videoId,commentId);
    res.json(updatedVideo);
})

commentRouter.put(
    "/:commentId",
    isUser(),
    body("content")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Content of the comment can't be empty!"),
    async (req: MyRequest, res) => {
        const content = req.body.content;
        const commentId = req.params.commentId;
        const isValid = await checkCommentId(commentId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
            return;
        }
        try {
            const results = validationResult(req);
            if (!results.isEmpty()) {
                throw new Error(errorParser(results));
            }
            const newComment=await editComment(commentId,content);
            res.json(newComment);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ message: err.message });
            } else {
                res.status(400).json({ message: "Error occurd!" });
            }
            return;
        }
    }
);

commentRouter.post("/like/:commentId",isUser(),async(req:MyRequest,res)=>{
    const commentId = req.params.commentId;
    const user=req.user;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const updatedComment=await likeComment(user?._id,commentId);
    res.json(updatedComment);
})

commentRouter.post("/unlike/:commentId",isUser(),async(req:MyRequest,res)=>{
    const commentId = req.params.commentId;
    const user=req.user;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
        return;
    }
    const updatedComment=await unlikeComment(user?._id,commentId);
    res.json(updatedComment);
})

export { commentRouter };
