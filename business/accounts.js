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

exports.createAccount = createAccount;
