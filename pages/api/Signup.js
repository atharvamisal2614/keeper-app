import dbConnect from "@/middleware/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

async function handler(req, res) {
    if(req.method === 'POST'){
        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }

            // Hash password before storing it
            const salt = await bcrypt.genSalt(10); // Generate salt 2^5 = 512
            const hashedPassword = await bcrypt.hash(password, salt); // Hash password

            // Create a new user
            const newUser = new User({
                name, 
                email, 
                password: hashedPassword
            });

            const savedUser = await newUser.save();
            res.status(201).json({ message: "User Added Successfully", userId: savedUser._id });

        } catch (error) {
            console.log("Error saving data", error);
            res.status(500).json({ message: 'Error saving data.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed.' });
    }
}

export default dbConnect(handler);
