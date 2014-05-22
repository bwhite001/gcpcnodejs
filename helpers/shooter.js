var Shooter = require('../models/shooter.js');

var getAllShooters = function(callback)
{
	var array = [];

	getShootersChar(65,array,callback);
};

var getShootersChar =  function(charCode, array, callback)
{
	var upper = String.fromCharCode(charCode);
	var lower = upper.toLowerCase();

	upper = upper + "%";
	lower = lower + "%";

	Shooter.findAll({where: ["lastname like ? OR lastname like ?", upper, lower], sort: 'lastname ASC'})
	.complete(function(err, Shooters) {
		if(err) throw err;
		if(Shooter != null)
		{
			if(charCode >= 65)
				array[charCode-65] = Shooters;


			if(charCode < 90)
				getShootersChar(charCode+1, array, callback);
			else
				callback(array);
		}
	})
}


exports.getAllShootersNumbers = function(callback)
{
	var array = [];

	getAllShooters(function(shooters) {
		console.log(shooters.length)
		for(var index = 0; index < shooters.length; index++)
		{
			array.push(shooters[index].length);
		}

		callback(array);
	})
};

exports.getAllShooters = getAllShooters;

exports.getShootersByChar = function(char, callback)
{
	var charCode = char.toUpperCase().charCodeAt(0);
	var upper = String.fromCharCode(charCode);
	var lower = upper.toLowerCase();

	upper = upper + "%";
	lower = lower + "%";

	Shooter.findAll({where: ["lastname like ? OR lastname like ?", upper, lower], sort: 'lastname ASC'})
	.complete(function(err, Shooters) {
		if(err) throw err;
		if(Shooter != null)
		{
			callback(Shooters);
		}
	})
}