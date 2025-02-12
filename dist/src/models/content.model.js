"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentScehma = new mongoose_1.default.Schema({
    link: {
        type: String,
    },
    type: {
        type: String,
        // enum:["image","video","article","audio"],
        // default:'article',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag"
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.Content = mongoose_1.default.model('Content', contentScehma);
