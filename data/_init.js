const Sequelize = require("sequelize");
const db = {
  type: process.env.DB_TYPE || "sqlite",
  sqlitePath: process.env.DB_SQLITE_PATH || "./database.sqlite",
  database: process.env.DB || "database",
  username: process.env.DB_USERNAME || "username",
  password: process.env.DB_PASSWORD || "password"
};

exports.sequelize = new Sequelize(db.database, db.username, db.password, {
  host: "localhost",
  dialect: db.type,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: db.sqlitePath,

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
