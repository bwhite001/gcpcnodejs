var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Booking = connection.define('Booking', {
	comp_type: Sequelize.INTEGER,
	date: Sequelize.DATE,
	range_id:	{
		type: Sequelize.INTEGER,
		references: "Range_Lanes",
    	referencesKey: "id",constraints: false
	},
	shooter_id:	{
		type: Sequelize.INTEGER,
		references: "Shooters",
    	referencesKey: "id",constraints: false
	},
});

module.exports = Booking;
