import OptimizationSession from "../database/models/prompt.model";

async function getSessionById(id) {
  const session = await OptimizationSession.findByPk(id);
  return session;
}

async function getAllSessions() {
  const session = await OptimizationSession.findAll();
  return session;
}

async function createOptimizationSession() {
  const details = { prompts: [] };
  const session = await OptimizationSession.create(details);
  return session;
}

async function updateOptimizationSession(prompts, id) {
  const data = await OptimizationSession.update({ prompts }, { where: { id } });
  return data;
}

async function deleteSession(id) {
  return OptimizationSession.destroy({ where: { id } });
}

export default {
  getSessionById,
  getAllSessions,
  createOptimizationSession,
  deleteSession,
  updateOptimizationSession,
};
