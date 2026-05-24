import { UserAttributes } from "../types/users";
import { FileType, VideosType } from "../types/videos";
import { Comments } from "../models/comments";
import { Videos } from "../models/videos";

export async function getVideoById(videoId: string | undefined | null) {
	const video = await Videos.findById(videoId)
		.populate({
			path: "comments",
			populate: {
				path: "ownerId",
				model: "Users",
				select: "username profileImage",
			},
		})
		.populate("ownerId", "username profileImage")
		.lean();

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
	const videos = await Videos.find()
		.select("title thumbnail ownerId created_at")
		.sort({ created_at: -1 })
		.populate("ownerId", "username profileImage")
		.lean();

	return videos;
}

export async function pagination(page: number) {
	const skipCount = page * 3;
	const videos = await Videos.find()
		.limit(3)
		.skip(skipCount)
		.select("title thumbnail ownerId created_at")
		.sort({ created_at: -1 })
		.populate("ownerId", "username profileImage")
		.lean();
	return videos;
}

export async function searchVideos(title: string) {
	const videos = await Videos.find({ title: new RegExp(title, "i") })
		.select("title thumbnail ownerId created_at")
		.populate("ownerId", "username profileImage")
		.lean();

	return videos;
}

export async function createVideo(
	title: string,
	videoUrl: FileType | null,
	description: string,
	thumbnail: FileType | null,
	user: UserAttributes | null | undefined,
) {
	const newVideo = await Videos.create({
		title: title,
		videoUrl: videoUrl ?? {},
		description: description,
		thumbnail: thumbnail ?? {},
		ownerId: user?._id,
	});

	return newVideo;
}

export async function deleteVideo(videoId: string) {
	const video = await Videos.findById(videoId);
	await Comments.deleteMany({ videoId: video?._id });
	await video?.deleteOne();
}

export async function editVideo(
	videoId: string,
	data: Partial<VideosType>,
	tumbnail: FileType | null,
	video: FileType | null,
) {
	const videoData: any = {
		title: data.title,
		description: data.description,
	};

	if (tumbnail) {
		videoData.thumbnail = tumbnail;
	}

	if (video) {
		videoData.videoUrl = video;
	}

	const updatedVideos = await Videos.findByIdAndUpdate(
		videoId,
		{
			$set: videoData,
		},
		{ new: true },
	)
		.populate({
			path: "comments",
			populate: {
				path: "ownerId",
				model: "Users",
				select: "username profileImage",
			},
		})
		.populate("ownerId", "username profileImage")
		.lean();

	return updatedVideos;
}

export async function likeVideo(
	user: UserAttributes | null | undefined,
	videoId: string,
) {
	const updatedVideos = await Videos.findByIdAndUpdate(
		videoId,
		{
			$addToSet: { likes: user?._id },
		},
		{ new: true },
	).select("likes").lean();

	return updatedVideos?.likes;
}
export async function unlikeVideo(
	user: UserAttributes | null | undefined,
	videoId: string,
) {
	const updatedVideos = await Videos.findByIdAndUpdate(
		videoId,
		{
			$pull: { likes: user?._id },
		},
		{ new: true },
	).select("likes").lean();

	return updatedVideos?.likes;
}
export async function dislikeVideo(
	user: UserAttributes | null | undefined,
	videoId: string,
) {
	const updatedVideos = await Videos.findByIdAndUpdate(
		videoId,
		{
			$addToSet: { dislikes: user?._id },
		},
		{ new: true },
	)
		.select("dislikes")
		.lean();

	return updatedVideos?.dislikes;
}
export async function undislikeVideo(
	user: UserAttributes | null | undefined,
	videoId: string,
) {
	const updatedVideos = await Videos.findByIdAndUpdate(
		videoId,
		{
			$pull: { dislikes: user?._id },
		},
		{ new: true },
	)
		.select("dislikes")
		.lean();

	return updatedVideos?.dislikes;
}
