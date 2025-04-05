import mongoose from "mongoose";
import { Users } from "../models/users"; 

export async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Videos-Platfrom");
    await Users;
    console.log("Database is running...");
}