import express from "express";
import {
  createSession,
  updateSession,
  getSession,
  getAllSessions,
} from "../controllers/prompt.controller";
import { isAuthenticated, validateParams } from "../middlewares";
import { paramsSchemas } from "../utils";

const sessionRouter = express.Router();

sessionRouter.post("/", isAuthenticated, createSession);

sessionRouter.patch("/:id", isAuthenticated, updateSession);

sessionRouter.get(
  "/:id",
  validateParams(paramsSchemas.sessionIdSchema),
  getSession
);

sessionRouter.get("/", getAllSessions);

export default sessionRouter;
