import { NextFunction, Request, Response } from "express";

export function setCors(){
    return function (req:Request,res:Response,next:NextFunction){
        res.setHeader("Access-Control-Allowed-Origin","*");
        res.setHeader("Access-Control-Allow-Methods","OPTIONS,GET,POST,DELETE,PUT");
        res.setHeader("Access-Control-Allow-Headers","Content-type,X-Authorization");
        next();
    }
}