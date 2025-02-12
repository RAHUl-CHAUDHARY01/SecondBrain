"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
//sgnup route
router.route("/signup").post(user_controller_1.signUp);
router.route("/signin").post(user_controller_1.signIn);
exports.default = router;
