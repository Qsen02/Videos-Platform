import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
	file: Express.Multer.File,
	folder: string,
	type: "image" | "video" = "image",
) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				folder,
				resource_type: type,
			},
			(error, result) => {
				if (error) return reject(error);
				resolve(result);
			},
		);

		streamifier.createReadStream(file.buffer).pipe(stream);
	});
};

export const deleteFromCloudinary = async (publicId: string, type: "image" | "video" = "image") => {
	return await cloudinary.uploader.destroy(publicId, { resource_type: type });
};

const upload = multer({
	storage: multer.memoryStorage(),
});

export { upload };
