import express from "express";

import {
  categoryControllers,
  createCateogoryControllers,
  deleteCategoryControllers,
  singleCategoryControllers,
  updateCategoryControllers,
} from "../controllers/categoryControllers.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  creating category routes

router.post(
  "/create-category",
  requiredSignIn,
  isAdmin,
  createCateogoryControllers
);

// updating category
router.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryControllers
);

// get categroy
router.get("/get-category", categoryControllers);


// get single category

router.get("/single-category/:slug", singleCategoryControllers)


// delete category 

router.delete("/delete-category/:id", deleteCategoryControllers)

export default router;
