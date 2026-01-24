import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { userReadLimiter } from "../middlewares/limiters.js";

const router = express.Router();

router.get("/", authMiddleware,userReadLimiter, async (req, res) => {
    try {        
        const notifications = await Notification.find({ recipient: req.user.userID })
            .populate("sender", "username profilePicture")
            .populate("post", "title")
            .sort({ createdAt: -1 })
            .limit(30);
        res.status(200).json(notifications)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.put("/:id/read",authMiddleware,userReadLimiter, async (req,res)=>{
    try{
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: "Not found" });

        if (notification.recipient.toString() !== req.user.userID) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        notification.isRead = true;
        await notification.save();
        res.status(200).json(notification);

    }catch(error){
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.put("/mark-all-read", authMiddleware,userReadLimiter, async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.userID, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).json({ message: "All read" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});

export default router;