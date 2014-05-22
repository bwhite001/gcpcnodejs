var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Score_Pistol = connection.define('Score_Pistol', {
	id:	{
		type: Sequelize.INTEGER,
		references: "Scores",
    	referencesKey: "id",constraints: false
	},
	handicap: Sequelize.INTEGER,
	suported:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Score_Pistol;
