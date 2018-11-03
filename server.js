const db = require("./data/_init");
const express = require("express");
const business = require("./business");
const bodyParser = require("body-parser");
const api = require("./presentation/api");
require("dotenv").load();

const app = express();
app.use(bodyParser.json());
app.set("superSecret", process.env.SECRET || "very unsafe secret");

// api routes

var apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
	res.send("Welcome to the api");
});
apiRoutes.post("/authentication", api.accounts.login);
apiRoutes.get("/playable-characters", api.accounts.playableCharacters);
apiRoutes.post("/account", api.accounts.register);

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
