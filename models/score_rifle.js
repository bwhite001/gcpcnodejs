var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Score_Rifle = connection.define('Score_Rifle', {
	id:	{
		type: Sequelize.INTEGER,
		references: "Scores",
    	referencesKey: "id",constraints: false
	},
	match_type:	{
		type: Sequelize.INTEGER,
		references: "Match_Types",
    	referencesKey: "id",constraints: false
	},
});

module.exports = Score_Rifle;
