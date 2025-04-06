import { Request } from "express";
import { UserAttributes } from "./users";

export interface MyRequest extends Request{
    user?:UserAttributes | null;
}