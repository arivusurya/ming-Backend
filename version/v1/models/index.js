require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASENAME,
  process.env.DbUSERNAME,
  process.env.PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    benchmark: false,
    logging: false,
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      charset: "utf8mb4",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    timezone: "+05:30",
    pool: {
      max: 5000,
      min: 5,
    },
  }
);

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("DataBase Connection established!");
      connection = true;
    })
    .catch((err) => {
      console.error("Unable to connect to the database!:", err);
    });

module.exports = sequelize;
