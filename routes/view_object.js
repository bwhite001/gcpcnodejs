var navbar = require("../views/template/navigation.js");
var bootstrap = require("../views/template/bootstrap.js");
var Series = require('../helpers/series.js');


module.exports.create = function(req)
{
	var view = {};
	view.navbar = navbar.create(req.session.user);
	view.series = req.session.series;


	view.currentUrl = req.url;
	//view.req.session = series.getCurrent(req.session.series);

	if(req.session.user && req.session.user.bootstrap)
		view.bootstrap = bootstrap.get(req.session.user.bootstrap);
	else
		view.bootstrap = bootstrap.get('superhero');
	view.user = req.session.user;



	return view;
}

module.exports.bootstrap_themes = bootstrap.themes;

module.exports.setbootstrap = function(user)
{
	user.bootstrap = bootstrap.get(user.bootstrap);

	return user;
}