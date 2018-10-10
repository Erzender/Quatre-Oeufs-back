const dotenv = require("dotenv");
const data = require("./data/_init");

if (process.env.NODE_ENV !== "production") {
  dotenv.load();
}

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });