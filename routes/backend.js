/*
 * backend.js
 * Backend routes which require a valid login for access
 */

var Deal = require('../models/deal.js');
var fs = require('fs');
var navbar = require('../models/navbaradmin.js');

exports.deals = function(req, res) {
	Deal.findAll({where: {approved: false}})
		.success(function(deals) {
			res.render('dashboard', {deals: deals, nav_loc: navbar.submited.title, navbar: navbar, admin:true});
		})
		.error(function() {
			res.send(500, 'Internal Server Error');
		});
};

exports.approved = function(req, res) {
	var date = new Date();
	date.setHours(0, 0, 0, 0);

	Deal.findAll(
		{where: {
			approved: true,
			expires: {gte: date}
		}})
		.success(function(deals) {
			res.render('dashboard', {deals: deals, nav_loc: navbar.approved.title, navbar: navbar, admin:true});
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
};

exports.expired = function(req, res) {
	var date = new Date();
	date.setHours(0, 0, 0, 0);

	Deal.findAll(
		{where: {
			approved: true,
			expires: {lt: date}

		}})
		.success(function(deals) {
			res.render('dashboard', {deals: deals, expired:navbar.expired.title, nav_loc: navbar.expired.title, navbar: navbar, admin:true});
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
};

exports.deal = function(req, res) {
	var approved = (req.params.approved == 'approved');
	var title = (approved) ? navbar.approved.title : navbar.submited.title

	Deal.find(req.params.id)
		.success(function(deal) {
			if(deal != null && (approved == deal.approved))
				res.render('deal', {deal: deal, navbar: navbar, title: title, approved: approved, admin:true});
			else
				res.redirect('/dashboard');
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
};

exports.approve = function(req, res) {
	Deal.find(req.params.id)
		.success(function(deal) {
			if (!deal)
				return res.send(404);

			deal.approved = true;
			deal.save()
			.success(function() {
				res.send(200);
			})
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
};

exports.remove = function(req, res) {
	Deal.find(req.params.id)
		.success(function(deal) {
			if(deal.has_image)
			{
				imageloc = process.cwd() + '/static/uploads/'+deal.id+'.'+deal.file_type;
				if(fs.existsSync(imageloc))
					fs.unlink(imageloc, function (err) {
					  if (err) 
					  {
					  	throw err;
					  	res.send(500, err);
					  }
					});
			}
			Deal.destroy({id: deal.id})
			.success(function() {
				res.send(200);
			})
			.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
		});
};

exports.clearexpired = function(req, res) {
	var date = new Date();
	date.setHours(0, 0, 0, 0);

	Deal.destroy("approved = true AND expires < '"+date.toISOString()+"'")
		.success(function() {
			res.send(200);
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
};

exports.updateform = function(req, res) {
	Deal.find(req.params.id)
		.success(function(deal) {
			res.render('submit', {deal: deal, navbar: navbar, admin:true});
		})
}

exports.successUpdatePage = function(req, res) {
	res.render('submitAfter', {navbar: navbar, error: false, update:true, dealname: req.query.dealname, admin:true});
};

exports.update = function(req, res) {
	Deal.find(req.params.id)
		.success(function(deal) {
			if (!deal)
				res.redirect('/error');

			deal.updateAttributes(req.body)
			.success(function() {
				res.redirect('/successupdate?dealname='+req.body.deal_name);
			})
		})
		.error(function(err) {res.send(500, 'Internal Server Error, '+err);})
}