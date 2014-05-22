var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Award_Type = connection.define('Award_Type', {
	name: Sequelize.STRING,
	content: Sequelize.STRING,
	subtitle: Sequelize.STRING
});

module.exports = Award_Type;
