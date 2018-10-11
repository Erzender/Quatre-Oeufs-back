const data = require("./_model");

const newPlayer = async (password, rank) => {
  try {
    var player = await data.Player.create({ password: password, rank: rank });
  } catch {
    err => {
      throw err;
    };
  }
  return player.id;
};

exports.newPlayer = newPlayer;
