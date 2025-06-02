import mongoose from "mongoose";
import User from "./User";

const KeepSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required:true},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:User, required:true},
} , {
    timestamps: true
})

export default mongoose.models.Keep  || mongoose.model("Keep", KeepSchema)