"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../controllers/content.controller");
const user_middleware_1 = require("../middlewares/user.middleware"); // Ensure it's imported
const router = (0, express_1.Router)();
// Protected routes (require authentication)
router.post("/content", user_middleware_1.userMiddleware, content_controller_1.addContent);
router.delete("/content", user_middleware_1.userMiddleware, content_controller_1.deleteContent);
router.post("/brain/share", user_middleware_1.userMiddleware, content_controller_1.shareContent);
// Public routes (no authentication needed)
router.get("/content", user_middleware_1.userMiddleware, content_controller_1.getContent);
router.get("/brain/share/:shareLink", content_controller_1.getSharedContent);
exports.default = router;
