const Sequelize = require("sequelize");
const db = require("./_init");

const Player = db.sequelize.define("player", {
	password: Sequelize.STRING,
	gm_picture: Sequelize.STRING,
	gm_name: { type: Sequelize.STRING, unique: true },
	rank: Sequelize.STRING
});

const Character = db.sequelize.define("character", {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		primaryKey: true
	},
	picture: Sequelize.STRING
});

const Group = db.sequelize.define("group", {
	name: { type: Sequelize.STRING, unique: true }
});

const Chatroom = db.sequelize.define("chatroom", {});

const Chatmessage = db.sequelize.define("chatmessage", {
	gm_mode: Sequelize.BOOLEAN,
	content: Sequelize.TEXT,
	blocking: Sequelize.BOOLEAN
});

Player.hasOne(Character);
Character.belongsTo(Player);
Character.belongsTo(Group);
Group.hasMany(Character);
Group.hasOne(Chatroom);
Chatroom.belongsTo(Group);
Chatroom.hasMany(Chatmessage);
Chatmessage.belongsTo(Chatroom);
Chatmessage.belongsTo(Player);
Chatmessage.belongsTo(Character);

exports.Player = Player;
exports.Character = Character;
exports.Group = Group;
exports.Chatroom = Chatroom;
exports.Chatmessage = Chatmessage;
