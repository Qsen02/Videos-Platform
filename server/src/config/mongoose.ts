import mongoose from "mongoose";

export async function runDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Videos-Platfrom");
    console.log("Database is running");
}