const data = require("../data");
const bcrypt = require("bcrypt");
const errors = require("./_errors");

const editPlayer = async (id, { gm_name, gm_picture, rank, password }) => {
	return { success: true };
};

exports.test = editPlayer;
