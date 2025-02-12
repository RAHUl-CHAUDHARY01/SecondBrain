import {Router} from "express";
import { signUp,signIn } from "../controllers/user.controller";
const router = Router();
//sgnup route
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
export default router