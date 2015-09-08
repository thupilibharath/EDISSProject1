

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes');
var loginsuccess = require('./routes/login');
var updateanswers = require('./routes/updateanswers');
var logout = require('./routes/logout');
var http = require('http');
var path = require('path');

var app = express();
var count = 0;
var sess;

// Set app's environments
app.set('port', process.env.PORT || 7001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: 'xyz123abC', resave: true, saveUninitialized: true}));

//Routes
app.get('/', routes.index);
app.post('/login', loginsuccess.loginsuccess);
app.post('/updateresults', updateanswers.updateanswers);
app.get('/login1', function(req,res){
 res.render('quiz');
});
app.get('/logout', logout.logoutuser);

//Start Server
var serve = http.createServer(app);
serve.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

