import mongoose from "mongoose";
import { Users } from "../models/users";
import { Videos } from "../models/videos";
import { Comments } from "../models/comments"; 
import dotenv from "dotenv";
import { Answers } from "../models/answers";
dotenv.config();

const localDB="mongodb://127.0.0.1:27017/Videos-Platfrom";

export async function runDB(){
    await mongoose.connect(localDB);
    await Users;
    await Videos;
    await Comments;
    await Answers;
    console.log("Database is running...");
}