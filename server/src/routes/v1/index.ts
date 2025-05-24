import express from "express";
import authRoutes from "./auth.routes";
import transactionRoutes from "./transaction.routes";
import userRoutes from "./user.routes";
import { isUserAuthenticated } from "../../middlewares/auth";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/transaction", isUserAuthenticated, transactionRoutes);
router.use("/user", isUserAuthenticated, userRoutes);

export default router;
