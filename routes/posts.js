import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
        const posts = await Post.find().populate("author","username");
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error : error.message});
    }
})

router.post("/",authMiddleware, async (req,res)=>{
    try{
        const {title,content} = req.body;

        const newPost = new Post({
            title,
            content,
            author: req.user.userID
        })

        const savedPost = await newPost.save();
        res.status(201).json({savedPost});
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

router.delete("/:id",authMiddleware, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message : "Post bulunamadı"});

        if(post.author.toString() !== req.user.userID) return res.status(403).json({message : "Yetki yok"});

        await post.deleteOne();
        res.status(200).json({message : "Post silindi"});

    }catch(error){
        res.status(500).json({error : error.message});
    }
})

export default router;