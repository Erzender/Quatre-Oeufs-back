const jwt = require("jsonwebtoken");

const errors = require("../../business/_errors");
const error = require("./_errors");
const business = require("../../business");

const tokenValidation = async (req, res, next) => {
	var token = req.headers["token"];
	if (!token) {
		return error.status(res, errors.no_token);
	}
	try {
		var decoded = jwt.verify(token, req.app.get("superSecret"));
	} catch (err) {
		return error.status(res, errors.invalid_token);
	}
	req.decoded = decoded;
	next();
};

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
	return res.json({ success: true, token: token });
};

const playableCharacters = async (req, res) => {
	var ret = await business.accounts.listCharacters();
	if (!ret.success) {
		error.status(res, ret.error);
		return;
	}
	return res.json({ success: true, characters: ret.characters });
};

const register = async (req, res) => {
	if (!req.body || !req.body.name || !req.body.password) {
		error.status(res, errors.missing_parameters);
		return;
	}
	var ret = await business.accounts.createAccount(
		{ name: req.body.name },
		req.body.password
	);
	if (!ret.success) {
		error.status(res, ret.error);
		return;
	}
	return res.json({ success: true });
};

const editProfile = async (req, res) => {
	if (!req.body || !req.body.fields) {
		return error.status(res, errors.missing_parameters);
	}
	var ret = await business.accounts.edit(
		req.decoded.id,
		req.headers["id"] || req.query["id"] || req.decoded.id,
		req.body.fields
	);
	if (!ret.success) {
		return error.status(res, ret.error);
	}
	return res.json({ success: true });
};

const getProfile = async (req, res) => {
	var ret = await business.accounts.get(
		req.decoded.id,
		req.headers["id"] || req.query["id"] || req.decoded.id
	);
	if (!ret.success) {
		return error.status(res, ret.error);
	}
	return res.json({ success: true, player: ret });
};

exports.login = login;
exports.playableCharacters = playableCharacters;
exports.register = register;
exports.editProfile = editProfile;
exports.tokenValidation = tokenValidation;
exports.get = getProfile;
