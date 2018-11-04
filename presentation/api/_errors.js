const errors = require("../../business/_errors");

const status = (res, err) => {
	console.log("err: " + err);
	switch (err) {
	case errors.internal_error:
		return res.status(500).send(err);
	case errors.missing_parameters:
	case errors.invalid_parameter:
		return res.status(400).send(err);
	case errors.unavailable_name:
	case errors.unsafe_password:
	case errors.wrong_password:
	case errors.forbidden:
	case errors.no_token:
	case errors.invalid_token:
		return res.status(403).send(err);
	case errors.wrong_character:
		return res.status(422).send(err);
	default:
		return res.status(500).send("internal_error");
	}
};

exports.status = status;
