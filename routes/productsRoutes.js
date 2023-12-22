import express from "express";
import { requiredSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getSingleProductController,
  getproductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productControllers.js";

const router = express.Router();

// creating product routes
router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get product route
router.get("/get-product", getproductController);

// get single product route
router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

// delete  product route
router.delete("/delete-product/:pid", deleteProductController);

// update product route
router.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
