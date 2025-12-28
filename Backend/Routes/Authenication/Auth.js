import express from "express"; 
import dotenv from "dotenv";  

dotenv.config(); 
const router = express.Router(); 

router.post('/Auth/Signup', async (req, res) => {
  try {
    const { Email , Password , Username  } = req.body;
    if (!Email || !Password || !Username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingUser = await GetUser(Email); 
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = {
        Email,
        Password, 
        Username, 
        Role : "User" , 
        createdAt: new Date()
      };   
    const result = await CreateUser([newUser]); 
    return res.status(201).json({
      message: "User added successfully",
      insertedId: result.insertedId
    }); 
  } catch (err) {
    console.error("Error Adding User", err);
    return res.status(500).json({ error: "Internal server error while adding data" });
  }
}); 