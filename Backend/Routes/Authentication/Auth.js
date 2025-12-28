import express from "express";
import dotenv from "dotenv";
import CreateUser from "../../Database/Users/CreateUser.js";

dotenv.config();
const router = express.Router();

router.post("/auth/signup", async (req, res) => {
  try {
    const { Email, Password, Username } = req.body;
    if (!Email || !Password || !Username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = {
      Email,
      Password,
      Username,
      Role: "User"
    };
    const user = await CreateUser(newUser);
    return res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(400).json({
      error: err.message
    });
  }
}); 


export default router;