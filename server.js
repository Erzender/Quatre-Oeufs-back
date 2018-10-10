const dotenv = require("dotenv");
const data = require("./data");
const db = require("./data/_init")

if (process.env.NODE_ENV !== "production") {
  dotenv.load();
}

db.sequelize.sync()
  .then(() => data.User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });