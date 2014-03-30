/*
 * deal.js
 * Business deal model
 */

var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Deal = connection.define('Deal', {
	business_name: Sequelize.STRING,
	deal_name: Sequelize.STRING,
	member_number: Sequelize.STRING,
	expires: Sequelize.DATE,
	website: Sequelize.STRING,
	desc: Sequelize.TEXT,
	approved:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	has_image:	{
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	file_type: Sequelize.STRING
});

module.exports = Deal;
