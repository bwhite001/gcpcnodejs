var Deal = require('../models/deal.js');
var fs = require('fs');
var navbar = require('../models/navbar.js');

//Get /api/deals
exports.deals = function(req, res) {
	var date = new Date();
	date.setHours(0, 0, 0, 0);

	if(isNaN(req.params.id))
		req.params.id = 0;

	var deals = Deal.findAll({
		where: {
			approved: true,
			expires: {gte: date}
		}
	})

	.error(function(err) {res.send(500, 'Internal Server Error, '+err);})

	.success(function(deals){
		res.send(deals);
	});
};

