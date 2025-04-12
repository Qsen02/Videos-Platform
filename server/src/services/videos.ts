import { UserAttributes } from "../types/users";
import { VideosType } from "../types/videos";
import { Comments } from "../models/comments";
import { Videos } from "../models/videos";

export async function getVideoById(videoId: string) {
    const video = await Videos.findById(videoId).lean();

    if (!video) {
        throw new Error("Resource not found!");
    }

    return video;
}

export async function checkVideoId(videoId: string) {
    const video = await Videos.findById(videoId).lean();
    if (!video) {
        return false;
    }

    return video;
}

export async function getAllVideos() {
    const videos = await Videos.find().lean();

    return videos;
}

export async function pagination(page: number) {
    const skipCount = page * 6;
    const videos = await Videos.find().limit(6).skip(skipCount).lean();

    return videos;
}

export async function searchVideos(title: string) {
    const videos = await Videos.find({ title: new RegExp(title, "i") }).lean();

    return videos;
}

export async function createVideo(
    title: string,
    videoUrl: string,
    description: string,
    thumbnail:string,
    user: UserAttributes | null | undefined
) {
    const newVideo = await Videos.create({
        title: title,
        videoUrl: videoUrl,
        description: description,
        thumbnail:thumbnail,
        ownerId: user?._id,
    });

    return newVideo;
}

export async function deleteVideo(videoId: string) {
    const video = await Videos.findById(videoId);
    await Comments.deleteMany({ videoId: video?._id });
    await video?.deleteOne();
}

export async function editVideo(videoId: string, data: Partial<VideosType>) {
    const updatedVideos = await Videos.findByIdAndUpdate(
        videoId,
        {
            $set: data,
        },
        { new: true }
    ).lean();

    return updatedVideos;
}

export async function likeVideo(
    user: UserAttributes | null | undefined,
    videoId: string
) {
    const updatedVideos = await Videos.findByIdAndUpdate(videoId, {
        $push: { likes: user?._id },
    },{new:true}).lean();

    return updatedVideos;
}
export async function unlikeVideo(
    user: UserAttributes | null | undefined,
    videoId: string
) {
    const updatedVideos = await Videos.findByIdAndUpdate(videoId, {
        $pull: { likes: user?._id },
    },{new:true}).lean();

    return updatedVideos;
}
export async function dislikeVideo(
    user: UserAttributes | null | undefined,
    videoId: string
) {
    const updatedVideos = await Videos.findByIdAndUpdate(videoId, {
        $push: { dislikes: user?._id },
    },{new:true}).lean();

    return updatedVideos;
}
export async function undislikeVideo(
    user: UserAttributes | null | undefined,
    videoId: string
) {
    const updatedVideos = await Videos.findByIdAndUpdate(videoId, {
        $pull: { dislikes: user?._id },
    },{new:true}).lean();

    return updatedVideos;
}
