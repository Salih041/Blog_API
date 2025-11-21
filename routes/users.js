import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/:id", async (req,res)=>{  // user by id
    try{
        const user = await User.findById(req.params.id).select("-password");

        if(!user) return res.status(404).json({message : "User not found"});

        res.status(200).json(user);
    }catch(error)
    {
        res.status(500).json({error:error.message})
    }
})

export default router;