const jwt = require("jsonwebtoken");

const errors = require("../../business/_errors");
const error = require("./_errors");
const business = require("../../business");

const login = async (req, res) => {
	if (!req.body || !req.body.name || !req.body.password) {
		error.status(res, errors.missing_parameters);
		return;
	}
	var ret = await business.accounts.login({
		name: req.body.name,
		password: req.body.password
	});
	if (!ret.success) {
		error.status(res, ret.error);
		return;
	}
	var token = jwt.sign({ id: ret.id }, req.app.get("superSecret"), {
		expiresIn: 86400 // expires in 24 hours
	});
	res.json({ success: true, token: token });
	return;
};

const playableCharacters = async (req, res) => {
	var ret = await business.accounts.listCharacters();
	if (!ret.success) {
		error.status(res, ret.error);
		return;
	}
	res.json({ success: true, characters: ret.characters });
	return;
};

const register = async (req, res) => {
	res.json({ success: true });
	return;
};

exports.login = login;
exports.playableCharacters = playableCharacters;
exports.register = register;
