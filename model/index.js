var Sequelize = require("sequelize");
var dbConfig = require("../db/db.config");

//creating a connection between sequelize and postgres
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    min: dbConfig.pool.min,
    max: dbConfig.pool.max,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
};

//exporting the tables
db.User = require("./User.model")(Sequelize, sequelize);
db.Product = require("./Product.model")(Sequelize, sequelize);
// db.Employee = require("./Employee.model")(Sequelize, sequelize);
// db.Insurance = require("./Insurance.model")(Sequelize, sequelize);
// db.Student = require("./Student.model")(Sequelize, sequelize);
db.Order = require("./Order.model")(Sequelize, sequelize);

// export the db object with the models
module.exports = db;
