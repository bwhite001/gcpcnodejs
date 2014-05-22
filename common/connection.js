/*
 * connection.js
 * Reusable database connection object
 */

var Sequelize = require('sequelize');
var connection = new Sequelize('mysql://root:toor@192.168.56.101:3306/gcpcdb', {
  // Look to the next section for possible options
})
module.exports = connection;