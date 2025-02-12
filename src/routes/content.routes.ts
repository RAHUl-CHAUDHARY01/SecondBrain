import { Router } from "express";
import { 
    addContent, 
    getContent, 
    deleteContent, 
    shareContent, 
    getSharedContent 
} from "../controllers/content.controller";
import { userMiddleware } from "../middlewares/user.middleware"; // Ensure it's imported

const router = Router();

// Protected routes (require authentication)
router.post("/content", userMiddleware, addContent);
router.delete("/content", userMiddleware, deleteContent);
router.post("/brain/share", userMiddleware, shareContent);

// Public routes (no authentication needed)
router.get("/content",userMiddleware, getContent);
router.get("/brain/share/:shareLink", getSharedContent);

export default router;
