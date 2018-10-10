const Sequelize = require("sequelize");
const db = require("./_init");

const User = db.sequelize.define("user", {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

exports.User = User;
