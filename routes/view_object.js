var navbar = require("../views/template/navigation.js");
var bootstrap = require("../views/template/bootstrap.js");

module.exports.create = function(user)
{
	var view = {};
	view.navbar = navbar.create(user);
	if(user && user.bootstrap)
		view.bootstrap = bootstrap.get(user.bootstrap);
	else
		view.bootstrap = bootstrap.get('superhero');
	view.user = user;

	return view;
}

module.exports.bootstrap_themes = bootstrap.themes;

module.exports.setbootstrap = function(user)
{
	user.bootstrap = bootstrap.get(user.bootstrap);

	return user;
}