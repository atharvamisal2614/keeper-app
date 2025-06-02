import dbConnect from "@/middleware/mongoose";
import Keep from "@/models/Keep";
async function handler(req, res) {

    if (req.method === "POST") {
        const { title, content, userId } = req.body;

        if (!title || !content || !userId) {
            return res.status(400).json({ error: "Please fill in all fields." });
        }

        try {
            const newKeep = new Keep({ title, content, userId });
            await newKeep.save();
            return res.status(201).json({ success: true, message: "Keep Added Successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error Adding Keep", error });
        }
    } 
    
    else if (req.method === "GET") {
        const { userId } = req.query; //fetches userId from GET Request and from query link(URL). KEY=VALUE apir Eg. userId = 678.........
     
//userId=677ac.............
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        try {
            const keeps = await Keep.find({ userId });
            return res.status(200).json(keeps);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error Fetching Keeps", error });
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}

export default dbConnect(handler);
