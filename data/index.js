const Sequelize = require("sequelize");
const db = require("./_init");

const Player = db.sequelize.define("player", {
  password: Sequelize.STRING,
  gm_picture: Sequelize.STRING,
  gm_name: { type: Sequelize.STRING, unique: true },
  rank: Sequelize.STRING
});

const Character = db.sequelize.define("character", {
  name: { type: Sequelize.STRING, unique: true, allowNull: false },
  picture: Sequelize.STRING
});

const Group = db.sequelize.define("group", {
  name: { type: Sequelize.STRING, unique: true }
});

const ChatRoom = db.sequelize.define("chatroom", {});

const ChatMessage = db.sequelize.define("chatmessage", {
  gm_mode: Sequelize.BOOLEAN,
  content: Sequelize.TEXT,
  blocking: Sequelize.BOOLEAN,
  published: Sequelize.DATE,
  authorId: Sequelize.STRING,
  authorCharacterId: Sequelize.STRING
});

Player.hasOne(Character);
Player.belongsTo(Group);
Group.hasMany(Character);
Group.hasOne(ChatRoom);
ChatRoom.hasMany(ChatMessage);
ChatMessage.belongsTo(ChatRoom);

exports.Player = Player;
exports.Character = Character;
exports.Group = Group;
exports.ChatRoom = ChatRoom;
exports.ChatMessage = ChatMessage;
