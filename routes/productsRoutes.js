import express from "express";
import { requiredSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  braintreePaymentController,
  braintreeTokenController,
  countProductController,
  createProductController,
  deleteProductController,
  filterProductController,
  getSingleProductController,
  getproductController,
  productCategoryController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
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


// filter
router.post("/filter-product", filterProductController)

// count product
router.get("/count-product", countProductController)

// product  list
router.get('/product-list/:page', productListController)

// product search
router.get("/search/:keyword", searchProductController)


// related product
router.get("/related-product/:pid/:cid", relatedProductController)

// get product as per categories
router.get("/product-category/:slug", productCategoryController);


// payment gateway 

// token
router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment",  requiredSignIn, braintreePaymentController)

export default router;
