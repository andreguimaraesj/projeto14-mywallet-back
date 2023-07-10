import { Router } from "express";
import {
  signIn,
  signUp,
  signOut,
  editUser,
} from "../controllers/authController.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/user.Schemas.js";

export const userRouter = Router();

userRouter.post("/sign-in", validateSchema(signInSchema), signIn);
userRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
userRouter.use(validateAuth);
userRouter.delete("/sign-out", signOut);
userRouter.put("/edit-user", validateSchema(signUpSchema), editUser);

export default userRouter;
