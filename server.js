const db = require("./data/_init");
const data = require("./data");
const express = require("express");
require("dotenv").load();

const app = express();

db.sequelize.sync().then(() => {
	data.character
		.listCharacters()
		.then(characters =>
			data.group.newGroupWithCharacters(
				"group 1",
				characters.map(character => character.id)
			)
		);
	app.listen(process.env.PORT || 8080);
});
