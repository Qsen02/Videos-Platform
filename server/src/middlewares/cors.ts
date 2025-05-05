import { NextFunction, Request, Response } from "express";

export function setCors(){
    return function (req:Request,res:Response,next:NextFunction){
        const allowedOrigins=["https://videos-platform-client.onrender.com","http://localhost:5173"];
        const origin=req.headers.origin;
        if(origin && allowedOrigins.includes(origin)){
            res.setHeader("Access-Control-Allow-Origin",origin);
        }
        res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,POST,DELETE,PUT");
        res.setHeader("Access-Control-Allow-Headers","Content-type,X-Authorization");
        next();
    }
}