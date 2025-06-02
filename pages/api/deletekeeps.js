import dbConnect from "@/middleware/mongoose";
import Keep from "@/models/Keep";

async function handler(req, res) {
   if(req.method==='DELETE') {
    const {id} = req.body; 
   try {
        await Keep.findByIdAndDelete(id);
        res.status(200).json({message: "Keep deleted successfully"});
   } catch(error) {
        res.status(500).json({message : "Failed to DQelete Keeps"})
   } 
} else {
    res.status(405).json({message: "Method not allowed"})
}
}
export default dbConnect(handler)