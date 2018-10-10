const data = require("./data");
const db = require("./data/_init");
require("dotenv").load();

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
