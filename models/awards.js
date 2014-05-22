var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Award = connection.define('Award', {
	award_type:	{
		type: Sequelize.INTEGER,
		references: "Award_Type",
    	referencesKey: "id",constraints: false
	},
	score_id:	{
		type: Sequelize.INTEGER,
		references: "Score",
    	referencesKey: "id",constraints: false
	},
});

module.exports = Award;
