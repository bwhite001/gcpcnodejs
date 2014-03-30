/*
 * public.js
 * Publicly available routes
 */

var Deal = require('../models/deal.js');
var fs = require('fs');
var navbar = require('../models/navbar.js');

exports.index = function(req, res) {
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
		if(deals.length == 0)
			render(deals);
		else
			if(req.params.id != null)
				hasId(req.params.id, deals);
			else
				noId(deals);
	});
	var hasId = function(id, deals)
	{
		Deal.find({
			where: {
				approved: true,
				expires: {gte: date},
				id: req.params.id
			}
		})
		.success(function(deal) {
			if(deal != null)
			{
				render(deals, deal);
			}
			else
			{
				noId(deals);
			}
		})
	}
	var noId = function(deals)
	{
		var deal = deals[0];
		render(deals, deal);
	}

	var render = function(deals, deal)
	{
		if(deals.length == 0 || deal == null)
			res.render('index', {
				deal: null,
				deals: deals,
				navbar: navbar,
				nav_loc: navbar.home.title,
			});
		else
			res.render('index', {
				deal: deal,
				deals: deals,
				navbar: navbar,
				nav_loc: navbar.home.title,
			});
	}
};

exports.submit = function(req, res) {
	res.render('submit', {
		navbar: navbar,
		nav_loc: navbar.submit.title,
		error: !!req.query.error
	});
};

exports.process = function(req, res) {
	req.body.has_image = (req.files.image.originalFilename !== '');

	if(req.body.has_image)
	{
		var filename = req.files.image.originalFilename;
		var ftype = filename.substr(filename.lastIndexOf(".")+1);

		req.body.file_type = ftype;
	}
	else
		req.body.file_type = '';

	console.log(req.body);

	Deal.create(req.body)
		.success(function(deal) {
			if(deal.dataValues.has_image)
			{
				fs.readFile(req.files.image.path, function (err, data) {
					if(err)
						res.render('submitAfter', {navbar: navbar, error: true, errorMessage: err});

					var newPath = process.cwd()+'/static/uploads/'+deal.dataValues.id+'.'+ftype;

					fs.writeFile(newPath, data, function (err) {
						if(err)
							res.render('submitAfter', {navbar: navbar, error: true, errorMessage: err});
						else
							res.redirect('/success');
					});
				});
			}
			else
				res.redirect('/success');
		})
		.error(function() {
			res.redirect('/error');
		});
};

exports.successPage = function(req, res) {
	res.render('submitAfter', {navbar: navbar, error: false});
};

exports.errorPage = function(req, res) {
	res.render('submitAfter', {navbar: navbar, error: true});
};

exports.forohfor = function(req, res) {
	res.render('forohfor', {navbar: navbar});
};