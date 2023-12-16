import express from "express";
import {registerController} from "../controllers/authControllers.js"

// routing to authenticate

const router = express.Router();

// Register api

router.post("/register", registerController);


export default router;