import { uploadProfileImage, uploadThumbnail, uploadVideo } from "../api/cloudinary";

export function useUploadThumbnail() { 
    return async function(file: File) { 
        return await uploadThumbnail(file);
    }
}

export function useUploadVideo() {
    return async function (file: File) {
        return await uploadVideo(file);
    }
}

export function useUploadProfileImage() {
    return async function (file: File) {
        return await uploadProfileImage(file);
    }
}