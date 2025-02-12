"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = (0, express_1.Router)();
//sgnup route
router.route("/signup").post(user_controller_1.signUp);
exports.default = router;
