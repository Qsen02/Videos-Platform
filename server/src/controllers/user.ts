import { Router } from "express";
import {
	changePassword,
	checkUserId,
	editUser,
	followUser,
	getCreatedVideos,
	getFollwedUsers,
	getUserById,
	login,
	register,
	searchUsers,
	unfollowUser,
} from "../services/user";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParsers";
import { setToken } from "../services/token";
import { isUser } from "../middlewares/guard";
import { MyRequest } from "../types/express";

const userRouter = Router();

userRouter.get("/logout", isUser(), (req, res) => {
	res.status(200).json({ message: "Logout was successfull!" });
	return;
});

userRouter.get("/:userId", async (req, res) => {
	const userId = req.params.userId;
	console.log(req.ip);
	try {
		const user = await getUserById(userId);
		res.json(user);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(400).json({ message: "Error occurd!" });
		}
		return;
	}
});

userRouter.get("/search/:query", async (req, res) => {
	let query = req.params.query;
	if (query == "No value") {
		query = "";
	}
	const users = await searchUsers(query);
	res.json(users);
});

userRouter.get("/created-videos/:userId", isUser(), async (req, res) => {
	const userId = req.params.userId;
	const isValid = await checkUserId(userId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const videos = await getCreatedVideos(userId);
	if (videos.length == 0) {
		res.status(204).json(videos);
	} else {
		res.json(videos);
	}
});

userRouter.get("/follwedUsers/:userId", isUser(), async (req, res) => {
	const userId = req.params.userId;
	const isValid = await checkUserId(userId);
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const followedUsers = await getFollwedUsers(userId);
	if (followedUsers.length == 0) {
		res.status(204).json(followedUsers);
	} else {
		res.json(followedUsers);
	}
});

userRouter.post(
	"/register",
	body("username")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 symbols long!"),
	body("email").trim().isEmail().withMessage("Email must be valid!"),
	body("profileImage")
		.custom(
			(value: string, { req }) =>
				value.length == 0 || /^https?:\/\//.test(value)
		)
		.withMessage("Image must be valid URL!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		),
	body("repass")
		.trim()
		.custom((value: string, { req }) => req.body.password == value)
		.withMessage("Password must match!"),
	async (req, res) => {
		const fields = req.body;
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const user = await register(
				fields.username,
				fields.email,
				fields.password,
				fields.profileImage
			);
			const token = setToken(user);
			res.status(201).json({
				_id: user._id,
				username: user.username,
				email: user.email,
				profileImage: user.profileImage,
				accessToken: token,
			});
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

userRouter.post(
	"/login",
	body("username")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 symbols long!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		),
	async (req, res) => {
		const fields = req.body;
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const user = await login(fields.username, fields.password);
			const token = setToken(user);
			res.json({
				_id: user._id,
				username: user.username,
				email: user.email,
				profileImage: user.profileImage,
				accessToken: token,
			});
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

userRouter.post("/follow/:userId", isUser(), async (req: MyRequest, res) => {
	const userId = req.params.userId;
	const isValid = await checkUserId(userId);
	const user = req.user;
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedUser = await followUser(user, userId);
	res.json(updatedUser);
});

userRouter.post("/unfollow/:userId", isUser(), async (req: MyRequest, res) => {
	const userId = req.params.userId;
	const isValid = await checkUserId(userId);
	const user = req.user;
	if (!isValid) {
		res.status(404).json({ message: "Resource not found!" });
		return;
	}
	const updatedUser = await unfollowUser(user, userId);
	res.json(updatedUser);
});

userRouter.put(
	"/edit/:userId",
	isUser(),
	body("username")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 symbols long!"),
	body("email").trim().isEmail().withMessage("Email must be valid!"),
	body("profileImage")
		.custom(
			(value: string, { req }) =>
				value.length == 0 || /^https?:\/\//.test(value)
		)
		.withMessage("Image must be valid URL!"),
	async (req, res) => {
		const fields = req.body;
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await editUser(userId, fields);
			res.json(updatedUser);
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

userRouter.put(
	"/change-password/:userId",
	isUser(),
	body("newPassword")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols ant must contain digits, letters and at least one capital letter and special symbol!"
		),
	async (req, res) => {
		const password = req.body.newPassword;
		const userId = req.params.userId;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			res.status(404).json({ message: "Resource not found!" });
			return;
		}
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(errorParser(results));
			}
			const updatedUser = await changePassword(userId, password);
			res.json(updatedUser);
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

export { userRouter };
