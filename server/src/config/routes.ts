import { Express } from "express";
import { userRouter } from "../controllers/user";
import { videoRouter } from "../controllers/videos";
import { commentRouter } from "../controllers/comments";
import { answerRouter } from "../controllers/answers";

export function routerConfig(app: Express) {
    app.use("/users",userRouter);

    app.use("/videos",videoRouter);

    app.use("/comments",commentRouter);

    app.use("/answers",answerRouter);

    app.use((req, res) => {
        res.status(404).json({ message: "Resource not found!" });
        return;
    });
}
