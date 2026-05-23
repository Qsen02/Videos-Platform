async function request(data: FormData, type: "image" | "video") {
	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
		{
			method: "POST",
			body: data,
		},
	);
	return response.json();
}

export async function uploadThumbnail(file: File) {
	const formData = new FormData();

	formData.append("file", file);
	formData.append("upload_preset", "tumbnails-upload");

	const data = await request(formData, "image");
	return data;
}

export async function uploadVideo(file: File) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "videos-upload");
	const data = await request(formData, "video");
	return data;
}

export async function uploadProfileImage(file: File) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "profile-images-upload");
	const data = await request(formData, "image");
	return data;
}
