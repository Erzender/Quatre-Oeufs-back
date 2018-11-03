const db = require("./data/_init");
const express = require("express");
const business = require("./business");
require("dotenv").load();

const app = express();

// api routes

var apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
	res.send("Welcome to the api");
});

// main routes

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
	res.send("The api is running on /api");
});
app.get("*", function(req, res) {
	res.status(404).send("Wrong route");
});

// launch

const serve = async () => {
	var res = await business.accounts.listCharacters();
	console.log(res);
};

db.sequelize.sync().then(() => {
	serve();
	app.listen(process.env.PORT || 8080);
});
