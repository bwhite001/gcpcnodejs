var bcrypt = require("bcrypt");
var Admin = require("../models/admin.js");
var Shooter = require("../models/shooter.js");
var Series = require("../helpers/series.js");
var view = require("./view_object.js");


exports.view = function(req, res)
{
	if(req.session.user)
		res.redirect("/redirect");

	var viewObject = view.create(req);
	res.render('login');
}

exports.destroy = function(req, res) {
  req.session.user = null;
  res.redirect('/login');
};

exports.create = function(req, res) {
	if(!req.body.username || !req.body.password)
		res.redirect('/login');

	var username = req.body.username;

	if(username.indexOf("@") == "-1")
	{
		Admin.find({where: {username: username}}).complete(function(err, admin) {
			if (err) return res.redirect('/login');
			if (!admin) return res.redirect('/login?error=invalid');

			// password is hashed
			bcrypt.compare(req.body.password, admin.password_digest, function(err, match) {
				if (err || !match)
					return res.redirect('/login?error=invalid');

					admin.dataValues.admin = true;
					req.session.user = admin;
					res.redirect('/');	
			});
		});
	}
	else
	{
		Shooter.find({where: {email: username, cnum: req.body.password}}).complete(function(err, shooter) {
			if (err) return res.redirect('/login');
			if (!shooter) return res.redirect('/login?error=invalid');

			shooter = shooter;
			shooter.dataValues.name = shooter.firstname + " " + shooter.lastname;
			shooter.dataValues.admin = false;

			req.session.user = shooter;
			res.redirect('/redirect');

		});
	}
};

exports.setseries = function(req, res)
{
	var redirect = req.query.redirect;
	var series_id = req.params.id;
	Series.setCurrent(series_id, function(series) {
		if(series != null)
		{
			req.session.series = series;
		}
		else
			req.session.series = null;
		
		if(redirect != null)
			res.redirect(redirect);
		else
			res.redirect('/redirect');

	});
}