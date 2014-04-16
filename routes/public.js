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

	Deal.findAll({
		where: {
			approved: true,
			expires: {gte: date}
		}
	})

	.error(function(err) {res.send(500, 'Internal Server Error, '+err);})

	.success(function(deals){
		res.render('index', {
			deals: deals,
			navbar: navbar,
			nav_loc: navbar.home.title
		});
	})
};

exports.submit = function(req, res) {
	res.render('submit', {
		navbar: navbar,
		nav_loc: navbar.submit.title,
		error: !!req.query.error,
		deal: {}
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