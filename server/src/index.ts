import express from "express";
import dotenv from "dotenv";
import { expressConfig } from "./config/express";
import { runDB } from "./config/mongoose";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

async function start() {
    await runDB();
    expressConfig(app);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

start();
