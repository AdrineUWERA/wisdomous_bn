import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model";

const OptimizationSession = sequelize.define("optimizations", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  prompts: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: [],
  },
});

User.hasMany(OptimizationSession, {
  as: "user",
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "CASCADE",
});

export default OptimizationSession;
