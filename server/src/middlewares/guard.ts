import { NextFunction, Request, Response } from "express";

export function isUser(){
    return function (req:Request,res:Response,next:NextFunction){
        if(!req.headers['x-authorization']){
            res.status(401).json({message:"You are not authorized!"});
            return;
        }
        next();
    }
}