var data = require("./_model");

var newChatRoom = async () => {
	try {
		var chatRoom = await data.chatRoom.create();
	} catch (err) {
		throw err;
	}

	return chatRoom.dataValues;
};

exports.newChatRoom = newChatRoom;