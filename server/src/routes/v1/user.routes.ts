import express from "express";
import { zodValidation } from "../../services/zod";
import { getAllUsers } from "../../controllers/v1/user.controller";
const router = express.Router();

router.get("/", getAllUsers);

export default router;
