/*
 * app.js
 * Application configuration and entry point
 */

var express = require('express');
var routes  = require('./routes');
var app     = express();

//Set TMP DIR
//process.env.TMPDIR = process.cwd()+'/static/tmp/';


// config
app.set('view engine' , 'jade');
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));
app.use(express.logger('dev'));
app.locals.moment = require('moment');

var back_auth = express.basicAuth('bartercard2014', '4jL79d2');

// routes



app.get('/submit', routes.public.submit);
app.get('/success', routes.public.successPage);
app.get('/error', routes.public.errorPage);

app.post('/submit', routes.public.process);
app.get('/dashboard', back_auth, routes.backend.deals);

app.get('/dashboard/approved', back_auth, routes.backend.approved);
app.get('/dashboard/expired', back_auth, routes.backend.expired);
app.delete('/dashboard/expired', back_auth, routes.backend.clearexpired);
app.get('/dashboard/:approved/:id', back_auth, routes.backend.deal);
app.get('/dashboard/:id', back_auth, routes.backend.deal);
app.put('/set/:id', back_auth, routes.backend.approve);
app.delete('/set/:id', back_auth, routes.backend.remove);
app.get('/update/:id', back_auth, routes.backend.updateform);
app.post('/update/:id', back_auth, routes.backend.update);

app.get('/successupdate', back_auth,  routes.backend.successUpdatePage);

app.get('/', routes.public.index);


app.get('/api/deals', routes.api.deals);


//if not in routes
//app.get('*', routes.public.forohfor);

// listen
app.listen(app.get('port'));
console.log('Application started on port', app.get('port'));
