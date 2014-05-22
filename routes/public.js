var view = require("./view_object.js");
var Series = require("../models/series.js");

exports.index = function(req, res)
{
	var viewObject = view.create(req);

	res.render('index', viewObject);
	
}

exports.redirect = function(req, res)
{
	var viewObject = view.create(req);

	if(viewObject.user == null)
		res.redirect("/");
	else
		res.redirect(viewObject.navbar.home.location);
}

exports.theme = function(req, res)
{
	var viewObject = view.create(req);
	viewObject.bootstrapnav = view.bootstrap_themes;
	res.render('theme', viewObject);
}


exports.themechange = function(req, res)
{

	if(eq.session.user == null)
		res.redirect("/");
	
	req.session.user.bootstrap = req.params.theme;
	req.session.user = view.setbootstrap(req.session.user);
	res.redirect('/themes#theme_'+req.session.user.bootstrap);	
}