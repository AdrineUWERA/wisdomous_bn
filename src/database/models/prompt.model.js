import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db'

const OptimizationSession = sequelize.define('optimizations', {
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

export default OptimizationSession;
