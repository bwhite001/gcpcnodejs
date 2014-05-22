var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Score = connection.define('Score', {
	date: Sequelize.DATE,
	score: Sequelize.INTEGER,
	pistol_or_rifle:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	series_id:	{
		type: Sequelize.INTEGER,
		references: "Serieses",
    	referencesKey: "id",constraints: false
	},
	shooter_id:	{
		type: Sequelize.INTEGER,
		references: "Shooters",
    	referencesKey: "id",constraints: false
	},
});

module.exports = Score;
