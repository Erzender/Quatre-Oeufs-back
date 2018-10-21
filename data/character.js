var data = require("./_model");

var newCharacter = async name => {
	try {
		var character = await data.Character.create({ name: name });
	} catch (err) {
		throw err;
	}

	return character.dataValues;
};

const addPlayerCharacter = async (playerId, characterName) => {
	try {
		var player = await data.Player.findById(playerId);
	} catch (err) {
		throw err;
	}
	try {
		var character = await data.Character.create({ name: characterName });
		player.setCharacter(character);
	} catch (err) {
		throw err;
	}
	return character.dataValues;
};

exports.newCharacter = newCharacter;
exports.addPlayerCharacter = addPlayerCharacter;
