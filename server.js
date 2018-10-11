const data = require("./data");
const db = require("./data/_init");
const express = require("express");
require("dotenv").load();

const app = express()

db.sequelize
  .sync()
  .then(() =>
    data.Player.create({
      password: "lol",
      rank: "admin"
    })
  )
  .then(jane => {
    console.log(jane.toJSON());
  });

app.listen(process.env.PORT || 8080)