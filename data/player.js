const data = require("./_model");

const newPlayer = async password => {
	try {
		var player = await data.Player.create({
			password: password,
			rank: "player"
		});
	} catch (err) {
		throw err;
	}

	return player.id;
};

const listPlayers = async () => {
	try {
		var players = await data.Player.findAll();
	} catch (err) {
		throw err;
	}
	return players.map(player => player.dataValues);
};

const getPlayer = async id => {
	try {
		var player = await data.Player.findById(id);
	} catch (err) {
		throw err;
	}
	return player ? player.dataValues : null;
};

const getByCharacter = async name => {
	try {
		var character = await data.Character.findByPrimary(name);
		var player = await character.getPlayer();
	} catch (err) {
		throw err;
	}
	return player ? player.dataValues : null;
};

exports.new = newPlayer;
exports.list = listPlayers;
exports.get = getPlayer;
exports.getByCharacter = getByCharacter;
