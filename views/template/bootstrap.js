var themes = ["default","amelia","cerulean","cosmo","cyborg","darkly","flatly","journal","lumen","readable","simplex","slate","spacelab","superhero","united","yeti"];


module.exports.get = function(obj)
{
	if(obj || themes.indexOf(obj) != "-1")
		return obj;
	else
		return "default";
}
module.exports.getRandom = function()
{
	return themes[Math.floor(Math.random()*themes.length)]
}
module.exports.themes = themes;