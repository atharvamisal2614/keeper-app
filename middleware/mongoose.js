import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URI;
if(!MONGO_URL) {
    console.log("MongoDB connection string is not defined");
}
const dbConnect = (handler) => async(req, res)=>{
    if(mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect(MONGO_URL)
    console.log("MongoDB Connected Successfully")
    return handler(req,res)
}
export default dbConnect

