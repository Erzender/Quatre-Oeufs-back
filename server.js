const db = require("./data/_init");
const data = require("./data");
const express = require("express");
require("dotenv").load();

const app = express();

db.sequelize.sync().then(() => {
	data.player
		.newPlayer("lel")
		.then(
			data.player
				.listPlayers()
				.then(players =>
					data.character
						.addPlayerCharacter(players[0].id, "Gandalf")
						.then(character => console.log(character))
				)
		);

	app.listen(process.env.PORT || 8080);
});
