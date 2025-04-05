import express, { Express } from "express";
import { setCors } from "../middlewares/cors";
import { session } from "../middlewares/session";

function expressConfig(app:Express){
    app.use(setCors());
    app.use(session());
    app.use(express.json());
}

export {
    expressConfig
}