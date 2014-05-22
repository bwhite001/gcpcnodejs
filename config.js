// config
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/static'));
app.use(express.favicon(__dirname+'/static/favicons/favicon.ico')); 
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'f4bb6ed63dfe8aae'}));
app.use(express.logger('dev'));