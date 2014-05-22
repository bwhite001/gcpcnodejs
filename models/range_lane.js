var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Range_Lane = connection.define('Range_Lane', {
	range_num: Sequelize.INTEGER
});

module.exports = Range_Lane;
