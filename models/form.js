const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const Form = db.define(
  "forms",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    web: {
      type: DataTypes.STRING,
    },
    employee: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    hiring: {
      type: DataTypes.STRING,
    },
    references: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
    },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = { Form };
