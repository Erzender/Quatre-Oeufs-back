const db = require("./data/_init");
const data = require("./data");
const express = require("express");
require("dotenv").load();

const app = express();

db.sequelize.sync().then(() => {
  data.player.newPlayer("1234", "admin").then(id => console.log(id));
  app.listen(process.env.PORT || 8080);
});
