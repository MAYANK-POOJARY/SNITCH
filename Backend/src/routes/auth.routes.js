import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);
authRouter.post("/login", loginValidator, loginUser);

export default authRouter;