const data = require("./_model");
const Op = require("sequelize").Op;

const newGroup = async name => {
	try {
		var group = await data.Group.create({
			name: name
		});
		var chatRoom = await data.Chatroom.create();
		await group.setChatroom(chatRoom);
	} catch (err) {
		throw err;
	}
	return group ? group.dataValues : null;
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
		var chatRoom = await data.Chatroom.create();
		await group.setChatroom(chatRoom);
		for (var character of characters) {
			character.setGroup(group);
		}
	} catch (err) {
		throw err;
	}
	return group ? group.dataValues : null;
};

const listGroupCharacters = async groupId => {
	try {
		var group = await data.Group.findById(groupId);
		var characters = await group.getCharacters();
	} catch (err) {
		throw err;
	}
	return characters.map(character => character.dataValues);
};

const addCharacterToGroup = async (characterId, groupId) => {
	try {
		var group = await data.Group.findById(groupId);
		var character = await data.Character.findById(characterId);
		character.setGroup(group);
	} catch (err) {
		throw err;
	}
	return group ? group.dataValues : null;
};

const deleteGroup = async groupId => {
	try {
		var group = await data.Group.findById(groupId);
		var chatRoom = await group.getChatRoom;
		if (chatRoom) {
			await chatRoom.destroy();
		}
		await group.destroy();
	} catch (err) {
		throw err;
	}
	return true;
};

const listGroups = async () => {
	try {
		var groups = data.Group.findAll();
	} catch (err) {
		throw err;
	}
	return groups.map(group => group.dataValues);
};

const getCharacterGroup = async characterId => {
	try {
		var character = await data.Character.findById(characterId);
		var group = await character.getGroup();
	} catch (err) {
		throw err;
	}
	return group ? group.dataValues : null;
};

exports.new = newGroup;
exports.newWithCharacters = newGroupWithCharacters;
exports.listCharacters = listGroupCharacters;
exports.addCharacter = addCharacterToGroup;
exports.delete = deleteGroup;
exports.list = listGroups;
exports.get = getCharacterGroup;
