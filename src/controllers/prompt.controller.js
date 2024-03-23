import { asyncWrapper } from "../helpers";
import { promptServices } from "../services";

const createSession = asyncWrapper(async (req, res) => {
  const session = await promptServices.createOptimizationSession();

  return res
    .status(201)
    .json({ code: 201, message: "Session created", session });
});

const updateSession = asyncWrapper(async (req, res) => {
  console.log(req.body.prompts)
  const session = await promptServices.updateOptimizationSession(
    req.body.prompts,
    req.params.id
  );

  return res
    .status(200)
    .json({ code: 200, message: "Session updated", session });
});

const getSession = asyncWrapper(async (req, res) => {
  const session = await promptServices.getSessionById(req.params.id);

  return res.status(200).json({ code: 200, message: "One Session", session });
});

const getAllSessions = asyncWrapper(async (req, res) => {
  const sessions = await promptServices.getAllSessions();

  return res.status(200).json({ code: 200, message: "All Sessions", sessions });
});

export { createSession, updateSession, getSession, getAllSessions };
