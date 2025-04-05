import mongoose from "mongoose";
import { Users } from "../models/users";
import { Videos } from "../models/videos"; 

export async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Videos-Platfrom");
    await Users;
    await Videos;
    console.log("Database is running...");
}