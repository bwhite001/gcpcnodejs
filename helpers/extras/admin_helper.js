var bcrypt = require('bcrypt');
var Admin = require('../models/admin.js');

exports.create = function(username, name, password, isSuper) {
	bcrypt.hash(password, 8, function(err, hash) {
		if (err) throw err;

		Admin.create({name: name, password_digest: hash, username: username, is_super: isSuper});
	});
};
