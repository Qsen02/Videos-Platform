import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        ownerId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
        },
        content: {
            type: String,
            require: true,
        },
        likes: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Users",
            default: [],
        },
        videoId:{
            type:mongoose.SchemaTypes.ObjectId,
            ref: "Videos",
        }
    },
});

const Comments=mongoose.model("Comments",commentSchema);

export {
    Comments
}
