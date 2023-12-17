import express from "express";
import {loginController, registerController, testController} from "../controllers/authControllers.js"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

// routing to authenticate

const router = express.Router();

// Register route
router.post("/register", registerController);

// login route
router.post("/login", loginController)


// test route
router.get("/test", requiredSignIn, isAdmin, testController)

export default router;