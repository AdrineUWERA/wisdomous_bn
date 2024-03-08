import express from "express";
import {
  signup,
  getOneUser,
  login, 
} from "../controllers/user.controller";
import { asyncWrapper } from "../helpers";
import {
  userEmailExists,
  validate,
  validateParams,
} from "../middlewares";
import {
  SignUpSchema,
  paramsSchemas,
  LoginSchema,
} from "../utils";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validate(SignUpSchema),
  userEmailExists,
  asyncWrapper(signup)
);

userRouter.post(
  "/login",
  validate(LoginSchema),
  asyncWrapper(login)
);

userRouter.get(
  "/:id",
  validateParams(paramsSchemas.userIdSchema),
  asyncWrapper(getOneUser)
);

export default userRouter;
