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

sequelize
  .authenticate()
  .then(() => {
    console.log("conneted");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
