const data = require("./_model");
const Op = require("sequelize").Op;

const newGroup = async name => {
	try {
		var group = await data.Group.create({
			name: name
		});
	} catch (err) {
		throw err;
	}

	return group.dataValues;
};

const newGroupWithCharacters = async (name, characterIds) => {
	try {
		var characters = await data.Character.findAll({
			where: {
				id: { [Op.in]: characterIds }
			}
		});
		var group = await data.Group.create({
			name: name
		});
		for (var character of characters) {
			character.setGroup(group);
		}
	} catch (err) {
		throw err;
	}
	return group.dataValues;
};

exports.newGroup = newGroup;
exports.newGroupWithCharacters = newGroupWithCharacters;
