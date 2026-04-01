//https://sequelize.org/docs/v6/core-concepts/model-basics/
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Todo extends Model {}

Todo.init(
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    finish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },{ 
    sequelize, 
    modelName: "Todo" 
  }
);

module.exports = Todo;