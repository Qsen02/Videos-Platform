import { Comments } from "../models/comments";
import { Videos } from "../models/videos";

export async function getCommentById(commentId: string) {
    const comment = await Comments.findById(commentId).lean();
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
    userId: string,
    videoId: string,
    content: string
) {
    const newComment = await Comments.create({
        ownerId: userId,
        videoId: videoId,
        content: content,
    });

    return newComment;
}

export async function deleteComment(videoId: string, commentId: string) {
    await Comments.findByIdAndDelete(commentId);
    const updatedVideo = await Videos.findByIdAndUpdate(
        videoId,
        { $pull: { comments: commentId } },
        { new: true }
    );
    return updatedVideo;
}

export async function editComment(commentId: string, newContent: string) {
    const updatedComment = await Comments.findByIdAndUpdate(commentId, {
        $set: { content: newContent },
    });

    return updatedComment;
}

export async function likeComment(userId: string, commentId: string) {
    const updatedComment = await Comments.findByIdAndUpdate(commentId, {
        $push: { likes: userId },
    });

    return updatedComment;
}

export async function unlikeComment(userId: string, commentId: string) {
    const updatedComment = await Comments.findByIdAndUpdate(commentId, {
        $pull: { likes: userId },
    });

    return updatedComment;
}
