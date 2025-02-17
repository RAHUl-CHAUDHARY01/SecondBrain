"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedContent = exports.shareContent = exports.deleteContent = exports.getContent = exports.addContent = void 0;
const asynchandler_1 = require("../utils/asynchandler");
const content_model_1 = require("../models/content.model");
const mongoose_1 = __importDefault(require("mongoose"));
const link_model_1 = require("../models/link.model");
const user_model_1 = require("../models/user.model");
const random_1 = require("../utils/random");
const addContent = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title, tags = [] } = req.body; // Ensure tags is an array
    // Convert tag IDs to ObjectIds if they exist
    const tagIds = tags.map((tag) => new mongoose_1.default.Types.ObjectId(tag));
    const newContent = yield content_model_1.Content.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: tagIds // Pass an array of ObjectIds
    });
    res.json({ message: "Content added successfully", content: newContent });
}));
exports.addContent = addContent;
const getContent = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    // console.log(userId);
    const content = yield content_model_1.Content.find({ userId: userId }).populate("userId", "username");
    // console.log(content);
    res.json(content);
}));
exports.getContent = getContent;
const deleteContent = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    if (!contentId) {
        res.status(400).json({ message: "Content ID is required" });
        return;
    }
    const deletedContent = yield content_model_1.Content.deleteOne({ _id: contentId, userId: req.userId });
    if (deletedContent.deletedCount === 0) {
        res.status(404).json({ message: "Content not found or unauthorized" });
        return;
    }
    res.json({ message: "Content deleted successfully" });
}));
exports.deleteContent = deleteContent;
const shareContent = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    if (share) {
        const existingLink = yield link_model_1.Link.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        //Generate a new hash for the shareable link.
        const hash = (0, random_1.random)(10);
        const LinkContent = yield link_model_1.Link.create({ hash, userId: req.userId });
        res.json({ hash });
    }
}));
exports.shareContent = shareContent;
const getSharedContent = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    // Find the link using the provided hash.
    const link = yield link_model_1.Link.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }
    // Fetch content and user details for the shareable link.
    const content = yield content_model_1.Content.find({ userId: link.userId });
    const user = yield user_model_1.User.findOne({ _id: link.userId });
    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }
    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
}));
exports.getSharedContent = getSharedContent;
