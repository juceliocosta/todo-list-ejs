const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // db.sqlite - para persistencia en disco
  logging: false,
});

module.exports = sequelize;