import { Router } from "express";
import {
	checkVideoId,
	createVideo,
	deleteVideo,
	dislikeVideo,
	editVideo,
	getAllVideos,
	getVideoById,
	likeVideo,
	pagination,
	searchVideos,
	undislikeVideo,
	unlikeVideo,
} from "../services/videos";
import { isUser } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParsers";
import { MyRequest } from "../types/express";
import {
	deleteFromCloudinary,
	upload,
	uploadToCloudinary,
} from "../config/multer";

const videoRouter = Router();

videoRouter.get("/", async (req, res) => {
	const videos = await getAllVideos();
	res.json(videos);
});

videoRouter.get("/:videoId", async (req, res) => {
	const videoId = req.params.videoId;
	try {
		const video = await getVideoById(videoId);
		res.json(video);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

videoRouter.get("/search/:query", async (req, res) => {
	let query = req.params.query;
	if (query == "No value") {
		query = "";
	}
	const videos = await searchVideos(query);
	res.json(videos);
});

videoRouter.get("/page/:pageNumber", async (req, res) => {
	const pageNumber = Number(req.params.pageNumber);
	const videos = await pagination(pageNumber);
	res.json(videos);
});

videoRouter.post(
	"/",
	isUser(),
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "video", maxCount: 1 },
	]),
	body("title")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 symbols long!"),
	body("description")
		.trim()
		.isLength({ min: 10, max: 300 })
		.withMessage("Descriprion mut be between 10 and 300 symbols!"),
	async (req: MyRequest, res) => {
		const files = req.files as {
			thumbnail?: Express.Multer.File[];
			video?: Express.Multer.File[];
		};
		const thumbnailFile = files?.thumbnail?.[0];
		const videoFile = files?.video?.[0];

		const thumbnailResult = thumbnailFile
			? await uploadToCloudinary(
					thumbnailFile,
					"videos-platform/tumbnails",
				)
			: null;

		const videoResult = videoFile
			? await uploadToCloudinary(videoFile, "videos-platform/videos","video")
			: null;
		const thumbnailData = thumbnailResult
			? {
					publicId: (thumbnailResult as any).public_id,
					imageUrl: (thumbnailResult as any).secure_url,
				}
			: null;

		const videoData = videoResult
			? {
					publicId: (videoResult as any).public_id,
					imageUrl: (videoResult as any).secure_url,
				}
			: null;
		const fields = req.body;
		const user = req.user;
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				throw new Error(errorParser(result));
			}
			const newVideo = await createVideo(
				fields.title,
				videoData,
				fields.description,
				thumbnailData,
				user,
			);
			res.status(201).json(newVideo);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	},
);

videoRouter.delete("/:videoId", isUser(), async (req, res) => {
	const videoId = req.params.videoId;
	const isValid = await checkVideoId(videoId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const oldVideo = await getVideoById(videoId);
	if (oldVideo && oldVideo.thumbnail.publicId) {
		await deleteFromCloudinary(oldVideo.thumbnail.publicId);
	}
	if (oldVideo && oldVideo.videoUrl.publicId) {
		await deleteFromCloudinary(oldVideo.videoUrl.publicId, "video");
	}
	await deleteVideo(videoId);
	res.status(200).json({ message: "Record was deleted successfully!" });
});

videoRouter.put(
	"/:videoId",
	isUser(),
	upload.fields([
		{ name: "thumbnail", maxCount: 1 },
		{ name: "video", maxCount: 1 },
	]),
	body("title")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 symbols long!"),
	body("description")
		.trim()
		.isLength({ min: 10, max: 300 })
		.withMessage("Descriprion mut be between 10 and 300 symbols!"),
	async (req: MyRequest, res) => {
		const fields = req.body;
		const videoId = req.params.videoId;
		const isValid = await checkVideoId(videoId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		const files = req.files as {
			thumbnail?: Express.Multer.File[];
			video?: Express.Multer.File[];
		};

		const thumbnailFile = files?.thumbnail?.[0];
		const videoFile = files?.video?.[0];

		const thumbnailResult = thumbnailFile
			? await uploadToCloudinary(
					thumbnailFile,
					"videos-platform/tumbnails",
				)
			: null;

		const videoResult = videoFile
			? await uploadToCloudinary(videoFile, "videos-platform/videos", "video")
			: null;

		const thumbnailData = thumbnailResult
			? {
					publicId: (thumbnailResult as any).public_id,
					imageUrl: (thumbnailResult as any).secure_url,
				}
			: null;

		const videoData = videoResult
			? {
					publicId: (videoResult as any).public_id,
					imageUrl: (videoResult as any).secure_url,
				}
			: null;
		const oldVideo = await getVideoById(videoId);
		if (oldVideo && oldVideo.thumbnail.publicId) {
			await deleteFromCloudinary(oldVideo.thumbnail.publicId);
		}
		if (oldVideo && oldVideo.videoUrl.publicId) {
			await deleteFromCloudinary(oldVideo.videoUrl.publicId, "video");
		}
		try {
			const result = validationResult(req);
			if (!result.isEmpty()) {
				throw new Error(errorParser(result));
			}
			const newVideo = await editVideo(
				videoId,
				fields,
				thumbnailData,
				videoData,
			);
			res.json(newVideo);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(400).json({ message: "Error occurd!" });
			}
			return;
		}
	},
);

videoRouter.post("/like/:videoId", isUser(), async (req: MyRequest, res) => {
	const videoId = req.params.videoId;
	const user = req.user;
	const isValid = await checkVideoId(videoId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedVideo = await likeVideo(user, videoId);
	res.json(updatedVideo);
});

videoRouter.post("/unlike/:videoId", isUser(), async (req: MyRequest, res) => {
	const videoId = req.params.videoId;
	const user = req.user;
	const isValid = await checkVideoId(videoId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedVideo = await unlikeVideo(user, videoId);
	res.json(updatedVideo);
});

videoRouter.post("/dislike/:videoId", isUser(), async (req: MyRequest, res) => {
	const videoId = req.params.videoId;
	const user = req.user;
	const isValid = await checkVideoId(videoId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedVideo = await dislikeVideo(user, videoId);
	res.json(updatedVideo);
});

videoRouter.post(
	"/undislike/:videoId",
	isUser(),
	async (req: MyRequest, res) => {
		const videoId = req.params.videoId;
		const user = req.user;
		const isValid = await checkVideoId(videoId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		const updatedVideo = await undislikeVideo(user, videoId);
		res.json(updatedVideo);
	},
);
export { videoRouter };
