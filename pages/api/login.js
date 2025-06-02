import dbConnect from "@/middleware/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                console.log("User Not Found");
                return res.status(404).json({ message: "User not found" });
            }

            // Compare entered password with hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log("Password Not Matched");
                return res.status(401).json({ message: "Invalid credentials" });
            }
            

            const token = jwt.sign(
                { userId: user._id, email: user.email }, "sakshiatharvamisal", { expiresIn: "1d" }
            );
            res.status(200).json({message: "Login Successful",userId: user._id, email: user.email, token});
            
           
        } catch (error) {
            console.error("Login Failed", error);
            res.status(500).json({ message: "Login Failed", error });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default dbConnect(handler);