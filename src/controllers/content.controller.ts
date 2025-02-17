import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynchandler"
import { ApiError } from "../utils/ApiError";
import { Content } from "../models/content.model";
// import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
import { userMiddleware } from "../middlewares/user.middleware";
import jwt from "jsonwebtoken";
import { Link } from "../models/link.model";
import { User } from "../models/user.model";
import { random } from "../utils/random";

interface AuthRequest extends Request {
    userId?: string; // Make it optional to prevent runtime issues
}

const addContent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { link, type, title, tags = [] } = req.body; // Ensure tags is an array

    // Convert tag IDs to ObjectIds if they exist
    const tagIds = tags.map((tag: string) => new mongoose.Types.ObjectId(tag));

    const newContent = await Content.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: tagIds // Pass an array of ObjectIds
    });

    res.json({ message: "Content added successfully", content: newContent });
});

const getContent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId= req.userId;
    // console.log(userId);
    const content = await Content.find({ userId:userId }).populate("userId","username");
    // console.log(content);
    res.json(content);
})

const deleteContent = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { contentId } = req.body;

    if (!contentId) {
        res.status(400).json({ message: "Content ID is required" });
        return;
    }

    const deletedContent = await Content.deleteOne({ _id: contentId, userId: req.userId });

    if (deletedContent.deletedCount === 0) {
        res.status(404).json({ message: "Content not found or unauthorized" });
        return;
    }

    res.json({ message: "Content deleted successfully" });
});



const shareContent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {share}= req.body;
    if(share){
        const existingLink=await Link.findOne({userId:req.userId});
        if(existingLink){
            res.json({hash:existingLink.hash});
            return ;
        }
        //Generate a new hash for the shareable link.
        const hash=random(10);
        const LinkContent= await Link.create({hash,userId:req.userId});
        res.json({hash});
    }
})
const getSharedContent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const hash = req.params.shareLink;
     // Find the link using the provided hash.
     const link = await Link.findOne({ hash });
     if (!link) {
         res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
         return;
     }
 
     // Fetch content and user details for the shareable link.
     const content = await Content.find({ userId: link.userId });
     const user = await User.findOne({ _id: link.userId });
 
     if (!user) {
         res.status(404).json({ message: "User not found" }); // Handle missing user case.
         return;
     }
 
     res.json({
         username: user.username,
         content
     }); // Send user and content details in response.
})

export { addContent, getContent, deleteContent, shareContent, getSharedContent };