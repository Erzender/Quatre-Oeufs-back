var data = require("./_model");
const Op = require("sequelize").Op;

var newCharacter = async name => {
	try {
		var character = await data.Character.create({ name: name });
	} catch (err) {
		throw err;
	}

	return character ? character.dataValues: null;
};

const addPlayerCharacter = async (playerId, characterName) => {
	try {
		var player = await data.Player.findById(playerId);
	} catch (err) {
		throw err;
	}
	try {
		var character = await data.Character.create({ name: characterName });
		await player.setCharacter(character);
	} catch (err) {
		throw err;
	}
	return character ? character.dataValues : null;
};

const listCharacters = async () => {
	try {
		var characters = await data.Character.findAll();
	} catch (err) {
		throw err;
	}
	return characters.map(character => character.dataValues);
};

const listPlayerCharacters = async () => {
	try {
		var characters = await data.Character.findAll({
			where: { playerId: { [Op.ne]: null } }
		});
	} catch (err) {
		throw err;
	}
	return characters.map(character => character.dataValues);
};

const listNPCs = async () => {
	try {
		var characters = await data.Character.findAll({
			where: { playerId: null }
		});
	} catch (err) {
		throw err;
	}
	return characters.map(character => character.dataValues);
};

exports.new = newCharacter;
exports.addPlayerCharacter = addPlayerCharacter;
exports.list = listCharacters;
exports.listPlayerCharacters = listPlayerCharacters;
exports.listNPCs = listNPCs;
