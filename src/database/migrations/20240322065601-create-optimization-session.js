import { v4 as uuidv4 } from "uuid";
import { DataTypes } from "sequelize";

const migration = {
  async up(queryInterface) {
    await queryInterface.createTable("optimizations", {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        allowNull: false,
      },
      prompts: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("optimizations");
  },
};

export default migration;
