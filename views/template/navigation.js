exports.create = function(user)
{
	if(!user)
		return;

	var home = {name: "Home", icon: "home", location: "/shooter/home"};

	if(user.admin)
	{
		home.name = "Dashboard";
		home.location = "/admin/dash";
		home.icon = "dashboard";
	}

	var nav = []
	if(user.admin)
	{
		nav = 
		[
			{
				name: "Shooters",
				location: "/admin/shooters",
				icon: "user",
			},
			{
				name: "Series",
				location: "/admin/series",
				icon: "list-alt",
			},
			{
				name: "Scores",
				location: "/admin/scores",
				icon: "screenshot",
			},
			{
				name: "Bookings",
				location: "/admin/bookings",
				icon: "calendar",
			},
			{
				name: "Web Page Themes",
				location: "/themes",
				icon: "text-height",
			}
			

		];

		if(user.is_super)
			nav.push({name: "Database Admin", location: "/", icon: "hdd"})
	}
	else
	{
		nav = 
		[	
			{
				name: "Stats",
				location: "/shooter/stats",
				icon: "user",
			},
			{
				name: "Submit Score",
				location: "/shooter/scores",
				icon: "screenshot",
			},
			{
				name: "Book Range",
				location: "/shooter/bookings",
				icon: "calendar",
			},
			{
				name: "Web Page Themes",
				location: "/themes",
				icon: "text-height",
			}
			
		];
	}

	return {navbar: nav, home: home}
}