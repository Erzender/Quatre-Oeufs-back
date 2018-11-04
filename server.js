const db = require("./data/_init");
const express = require("express");
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

apiRoutes.use(api.accounts.tokenValidation);

apiRoutes.patch("/account", api.accounts.editProfile);
apiRoutes.get("/account", api.accounts.get);

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
};

db.sequelize.sync().then(() => {
	serve();
	app.listen(process.env.PORT || 8080);
});
