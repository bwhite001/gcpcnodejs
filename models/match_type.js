var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Match_Type = connection.define('Match_Type', {
	name: Sequelize.STRING,
	handicap: Sequelize.INTEGER,
});

module.exports = Match_Type;
