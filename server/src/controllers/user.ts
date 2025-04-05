import { Router } from "express";
import { getUserById, login, register } from "../services/user";
import { body, validationResult } from "express-validator";
import { errorParser } from "../utils/errorParsers";
import { setToken } from "../services/token";
import { isUser } from "../middlewares/guard";

const userRouter = Router();

userRouter.get("/logout", isUser(),(req, res) => {
    res.status(200).json({ message: "Logout was successfull!" });
    return;
});

userRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
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

export { userRouter };
