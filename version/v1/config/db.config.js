const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.database,
  process.env.dbuser,
  process.env.dbpassword,
  {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
  }
);

module.exports = sequelize;
