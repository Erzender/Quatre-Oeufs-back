const db = require("./data/_init");
const data = require("./data");
const express = require("express");
require("dotenv").load();

const app = express();

db.sequelize.sync().then(() => {
  data.player.listPlayers().then(players => console.log(players));

  app.listen(process.env.PORT || 8080);
});
