const data = require("../data");
const bcrypt = require("bcrypt");
const errors = require("./_errors");

const createAccount = async (characterFields, password) => {
	if (!password || !characterFields.name) {
		return { error: errors.missing_parameters };
	}
	if (password.length < 8) {
		return { error: errors.unsafe_password };
	}
	try {
		var hash = await bcrypt.hash(password, 10);
		var player = await data.player.new(hash);
		await data.character.addPlayerCharacter(player, characterFields.name);
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			return { error: errors.unavailable_name };
		}
		console.error(err);
		return { error: errors.internal_error };
	}
	return { success: true };
};

const login = async fields => {
	if (!fields.name || !fields.password) {
		return { error: errors.missing_parameters };
	}
	try {
		var player = await data.player.getByCharacter(fields.name);
		if (player === null) {
			return { error: errors.wrong_character };
		}
		var compare = await bcrypt.compare(fields.password, player.password);
	} catch (err) {
		console.error(err);
		return { error: errors.internal_error };
	}
	if (!compare) {
		return { error: errors.wrong_password };
	}
	return { success: true, id: player.id };
};

const listCharacters = async () => {
	try {
		var characters = await data.character.listPlayerCharacters();
	} catch (err) {
		return { error: errors.internal_error };
	}
	return {
		success: true,
		characters: characters.map(character => character.name)
	};
};

exports.createAccount = createAccount;
exports.login = login;
exports.listCharacters = listCharacters;
