var view = require("./view_object.js");




exports.index = function(req, res)
{
	console.log(req.session.user);
	
	var viewObject = view.create(req.session.user);

	res.render('index', viewObject);
}

exports.theme = function(req, res)
{
	console.log(req.session.user);
	
	var viewObject = view.create(req.session.user);
	viewObject.bootstrapnav = view.bootstrap_themes;

	res.render('theme', viewObject);
}
exports.themechange = function(req, res)
{

	req.session.user.bootstrap = req.params.theme;
	
	console.log(req.session.user);

	req.session.user = view.setbootstrap(req.session.user);

	res.redirect('/themes#theme_'+req.session.user.bootstrap);	
}