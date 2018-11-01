var data = require("./_model");

var newChatRoom = async () => {
	try {
		var chatRoom = await data.Chatroom.create();
	} catch (err) {
		throw err;
	}

	return chatRoom.dataValues;
};

var deleteChatRoom = async id => {
	try {
		var chatRoom = await data.Chatroom.findById(id);
		await chatRoom.destroy();
	} catch (err) {
		throw err;
	}
	return true;
};

exports.new = newChatRoom;
exports.delete = deleteChatRoom;