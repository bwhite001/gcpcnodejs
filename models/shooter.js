var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Shooter = connection.define('Shooter', {
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	gender:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	grade:	{
		type: Sequelize.INTEGER,
		references: "Grades",
    	referencesKey: "id",
    	constraints: false
	},
	junior:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	cnum: Sequelize.INTEGER,
	rfid: Sequelize.STRING,
	email: Sequelize.STRING
});

module.exports = Shooter;
