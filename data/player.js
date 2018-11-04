const ranks = require("../_enums").ranks;
const data = require("./_model");

const newPlayer = async password => {
	try {
		var player = await data.Player.create({
			password: password,
			rank: ranks.player
		});
	} catch (err) {
		throw err;
	}

	return player.id;
};

const editPlayer = async (
	id,
	{ gmName, password, rank, gmPicture, charName, charPicture }
) => {
	try {
		var player = await data.Player.findById(id);
		await player.update({
			gm_name: gmName || player.gm_name,
			password: password || player.password,
			rank: rank || player.rank,
			gm_picture: gmPicture || player.gm_picture
		});
		var character = await player.getCharacter();
		if (!character) {
			return player.dataValues;
		}
		await character.update({
			name: charName || character.name,
			picture: charPicture || character.picture
		});
	} catch (err) {
		throw err;
	}
	return player.dataValues;
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
		if (player) {
			var character = await player.getCharacter();
		}
	} catch (err) {
		throw err;
	}
	return player
		? character
			? { player: player.dataValues, character: character.dataValues }
			: { player: player.dataValues }
		: null;
};

const getByCharacter = async name => {
	try {
		var character = await data.Character.findOne({ where: { name: name } });
		if (character === null) {
			return null;
		}
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
exports.edit = editPlayer;
