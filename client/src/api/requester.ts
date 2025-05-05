import { getUserData, removeUserTheme, removeUserData } from "../utils/userHelper";

const host = "http://localhost:3000/";

// const host="https://videos-platform-server.onrender.com/";

async function request(method: string, url: string, data?: object) {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	const options: RequestInit = {
		method: method,
		headers: headers,
	};

	const user = getUserData();
	if (user) {
		headers["X-Authorization"] = user.accessToken;
	}

	if (data) {
		options.body = JSON.stringify(data);
	}

	try {
		const res = await fetch(url, options);
		if (!res.ok) {
			if (res.status === 401 || res.status === 403) {
				removeUserData();
				removeUserTheme();
			}
			const err = await res.json();
			throw new Error(err.message);
		}
		const data = await res.json();
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Error occurd!");
		}
	}
}

export async function get(url: string) {
	return await request("GET", host + url);
}

export async function post(url:string,data:object){
    return await request("POST", host + url,data);
}

export async function del(url:string,){
    return await request("DELETE", host + url);
}

export async function put(url:string,data:object){
    return await request("PUT", host + url,data);
}
