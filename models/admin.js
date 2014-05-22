var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Admin = connection.define('Admin', {
	is_super:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	username: Sequelize.STRING,
	password_digest: Sequelize.STRING,
	name: Sequelize.STRING,
});

module.exports = Admin;
