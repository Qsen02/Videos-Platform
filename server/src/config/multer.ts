import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (publicId: string, type: "image" | "video" = "image") => {
	return await cloudinary.uploader.destroy(publicId, { resource_type: type });
};

const upload = multer({
	storage: multer.memoryStorage(),
});

export { upload };
