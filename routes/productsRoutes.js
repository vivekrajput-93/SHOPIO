import express from "express";
import {requiredSignIn, isAdmin} from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"
import { createProductController, getproductController } from "../controllers/productControllers.js";

const router = express.Router();

// creating product routes

router.post("/create-product", requiredSignIn, isAdmin, formidable(), createProductController)

// get product route
router.get("/get-product", getproductController)


export default  router;