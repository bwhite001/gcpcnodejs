var view = require("./view_object.js");
var DateFunctions = require("../helpers/extras/date.js");
var Series = require("../models/series.js");
var Shooter = require("../helpers/shooter.js");
var Grade = require("../models/grade.js");

// GET /admin/dash
exports.index = function(req, res)
{
	var viewObject = view.create(req);

	res.render('admin/dash', viewObject);
};

exports.series = function(req, res)
{
	var viewObject = view.create(req);

	Series.findAll({})
	.complete(function(err, serieses)
	{
		if(err) throw err;
		if(!serieses) serieses = [];

		for(index in serieses)
		{
			var s = serieses[index];
			s.start = DateFunctions.niceDate(s.start_date);
			var date = new Date(s.start_date);
			console.log(date);
			date.setDate(date.getDate()+7*s.length);
			
			console.log(date);

			s.end = DateFunctions.niceDate(date.toString());

		}

		viewObject.serieses = serieses;

		res.render('admin/series', viewObject);
	})
};

exports.shooters = function(req, res)
{
	var letter = req.params.letter; 

	if(letter == null || letter.length <= 0)
		letter = "A";

	var letter = letter.toUpperCase().charAt(0);
	Grade.findAll({})
	.complete(function(err, grades)
	{
		if(!err && grades)
			Shooter.getAllShootersNumbers(function(shooterNums) {
				Shooter.getShootersByChar(letter, function(shooters) {
					var viewObject = view.create(req);

					viewObject.shooterNums = shooterNums;
					viewObject.shooters = shooters;
					viewObject.letter = letter;
					viewObject.grades = grades;

					res.render('admin/shooters', viewObject);
				})
			});
	});
};