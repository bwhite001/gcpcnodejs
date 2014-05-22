var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Grade = connection.define('Grade', {
	grade: Sequelize.STRING(1),
});

module.exports = Grade;