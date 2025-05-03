import mongoose from "mongoose";
import { Users } from "../models/users";
import { Videos } from "../models/videos";
import { Comments } from "../models/comments"; 
import dotenv from "dotenv";
dotenv.config();

const localDB="mongodb://127.0.0.1:27017/Videos-Platfrom";

export async function runDB(){
    await mongoose.connect(process.env.PRODDB!);
    await Users;
    await Videos;
    await Comments;
    console.log("Database is running...");
}