const data = require("../data");
const bcrypt = require("bcrypt");
const errors = require("./_errors");
const ranks = require("../_enums").ranks;

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
		characters: characters.map(character => character.name).sort()
	};
};

const editProfile = async (
	idRequesting,
	idRequested,
	{ gmName, gmPicture, rank, newPassword, charName, charPicture },
	password
) => {
	if (newPassword && !password) {
		return { error: errors.forbidden };
	}
	try {
		var player = await data.player.get(idRequesting);
		if ((idRequested != idRequesting || rank) && player.rank !== ranks.admin) {
			return { error: errors.forbidden };
		}
		if (rank && !ranks[rank]) {
			return { error: errors.invalid_parameter };
		}
		if (newPassword && !(await bcrypt.compare(password, player.password))) {
			return { error: errors.wrong_password };
		}
		if ((gmName || gmPicture) && rank !== ranks.gm && rank != ranks.admin) {
			return { error: errors.forbidden };
		}
		await data.player.edit(idRequested, {
			gm_name: gmName,
			gm_picture: gmPicture,
			rank: rank,
			password: newPassword,
			charName: charName,
			charPicture: charPicture
		});
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			return { error: errors.unavailable_name };
		}
		console.error(err);
		return { error: errors.internal_error };
	}
	return { success: true };
};

const getProfile = async (idRequesting, idRequested) => {
	try {
		var player = await data.player.get(idRequesting);
		if (idRequested != idRequesting && player.rank !== ranks.admin) {
			return { error: errors.forbidden };
		}
		if (idRequested != idRequesting) {
			player = await data.player.get(idRequested);
		}
		var ret = {
			gmName: player.player.name,
			gmPicture: player.player.gmPicture,
			rank: player.player.rank,
			id: player.player.id
		};
		if (player.character) {
			ret.charName = player.character.name;
			ret.charPicture = player.character.picture;
		}
	} catch (err) {
		console.error(err);
		return { error: errors.internal_error };
	}
	return { success: true, player: ret };
};

exports.createAccount = createAccount;
exports.login = login;
exports.listCharacters = listCharacters;
exports.edit = editProfile;
exports.get = getProfile;
