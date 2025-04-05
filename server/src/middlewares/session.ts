import { NextFunction, Response } from "express";
import { validateToken } from "../services/token";
import { MyRequest } from "../../types/express";

export function session() {
    return function (req: MyRequest, res: Response, next: NextFunction) {
        const token = req.headers["x-authorization"];
        if (token && typeof token == "string") {
            try {
                const payload = validateToken(token);
                req.user = payload;
            } catch (err) {
                res.status(403).json({
                    message:
                        "You don't have credentials! Please login or register.",
                });
                return;
            }
        }
        next();
    };
}
