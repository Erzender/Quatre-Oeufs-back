const errors = require("../../business/_errors");

const status = (res, err) => {
	console.log(err);

	switch (err) {
	case errors.internal_error:
		res.status(500).send(err);
		return;
	case errors.missing_parameters:
		res.status(400).send(err);
		return;
	case errors.unavailable_name:
	case errors.unsafe_password:
	case errors.wrong_character:
	case errors.wrong_password:
		res.status(403).send(err);
		return;
	default:
		res.status(500).send("internal_error");
	}
	return;
};

exports.status = status;
