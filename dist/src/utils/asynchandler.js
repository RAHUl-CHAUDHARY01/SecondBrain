"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (requestHandler) => (req, res, next) => {
    console.log("inside async handler");
    Promise.resolve(requestHandler(req, res, next)).catch(next);
};
exports.asyncHandler = asyncHandler;
