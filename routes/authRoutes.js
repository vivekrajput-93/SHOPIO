import express from "express";
import {forgotPasswordController, getAllOrderController,getOrderController,loginController, orderStatusController, registerController, testController, updateProfileController} from "../controllers/authControllers.js"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

// routing to authenticate

const router = express.Router();

// Register route
router.post("/register", registerController);

// login route
router.post("/login", loginController)

// forgot password route

router.post("/forgot-password", forgotPasswordController)


// test route
router.get("/test", requiredSignIn, isAdmin, testController);

// proctected user route
router.get("/user-auth", requiredSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

// proctected Admin route
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

// update user profile
router.put('/update' , requiredSignIn, updateProfileController)

router.get("/orders", requiredSignIn, getOrderController);

router.get("/all-orders", requiredSignIn, isAdmin, getAllOrderController);

router.put("/order-status/:orderId", requiredSignIn, isAdmin, orderStatusController)

export default router;