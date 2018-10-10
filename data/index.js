const sequelize = require("./_init");

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
