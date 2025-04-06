import { Express } from "express";
import { userRouter } from "../controllers/user";
import { videoRouter } from "../controllers/videos";
import { commentRouter } from "../controllers/comments";

export function routerConfig(app: Express) {
    app.use("/users",userRouter);

    app.use("/videos",videoRouter);

    app.use("/comments",commentRouter);

    app.use((req, res) => {
        res.status(404).json({ message: "Resource not found!" });
        return;
    });
}
