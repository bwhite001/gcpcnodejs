/*
 * connection.js
 * Reusable database connection object
 */

var Sequelize = require('sequelize');
var dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/bcard';
var connection = new Sequelize(dbUrl, {dialect: 'postgres', protocol: 'postgres'});
module.exports = connection;