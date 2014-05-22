var Sequelize  = require('sequelize');
var connection = require('../common/connection.js');

var Series = connection.define('Series', {
	series_num: Sequelize.INTEGER,
	start_date: Sequelize.DATE,
	length: Sequelize.INTEGER
});

module.exports = Series;
