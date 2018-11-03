const db = require("./data/_init");
const express = require("express");
const business = require("./business");
require("dotenv").load();

const app = express();

const serve = async () => {
	var res = await business.accounts.createAccount(
		{ name: "Bill" },
		"undefineffd"
	);
	console.log(res);
};

db.sequelize.sync().then(() => {
	serve();
	app.listen(process.env.PORT || 8080);
});
