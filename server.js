const dotenv = require("dotenv");
const data = require("./data");
const db = require("./data/_init");

if (process.env.NODE_ENV !== "production") {
  dotenv.load();
}

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
