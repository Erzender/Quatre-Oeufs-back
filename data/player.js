const data = require("./_model");

const newPlayer = async (password, rank) => {
  try {
    var player = await data.Player.create({ password: password, rank: rank });
  } catch (err) {
    throw err;
  }

  return player.id;
};

const listPlayers = async () => {
  try {
    var players = await data.Player.findAll();
  } catch (err) {
    throw err;
  }
  return players;
};

exports.newPlayer = newPlayer;
exports.listPlayers = listPlayers;
