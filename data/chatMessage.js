var data = require("./_model");

var newChatMessage = async (
	chatRoomId,
	playerId,
	characterId,
	gm,
	text,
	blocking
) => {
	try {
		var chatRoom = await data.Chatroom.findById(chatRoomId);
		var player = await data.Player.findById(playerId);
		var character = await data.Character.findById(characterId);
		var chatMessage = await data.Chatmessage.create({
			gm_mode: gm,
			content: text,
			blocking: blocking
		});
		await chatMessage.setPlayer(player);
		await chatMessage.setCharacter(character);
		await chatMessage.setChatroom(chatRoom);
	} catch (err) {
		throw err;
	}

	return chatMessage.dataValues;
};

var listRoomMessages = async chatRoomId => {
	try {
		var chatRoom = await data.Chatroom.findById(chatRoomId);
		var messages = await chatRoom.getChatmessages();
	} catch (err) {
		throw err;
	}
	return messages.map(message => message.dataValues);
};

exports.new = newChatMessage;
exports.listRoom = listRoomMessages;