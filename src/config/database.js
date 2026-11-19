const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    logging: false,
    storage: isProduction ? process.env.DB_STORAGE : ":memory:",
});

module.exports = sequelize;