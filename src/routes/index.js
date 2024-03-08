import express from "express";
import userRoutes from "./user.route";
import googleUserRouter from "./user_with_google.route";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Prompt engineering platform" });
});

router.use("/users", userRoutes);
router.use("/", googleUserRouter);

export default router;
