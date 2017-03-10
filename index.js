var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
var mongodb = mongoose.connection;


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; 

// Handle get request
app.get('/api', function (req, res) {
    res.json({message: "Hooray! welcome admin to our api!"});
});


var users = express.Router();
require('./app/routes/users.js')(users);
app.use('/api/users', users);

var home = express.Router();
require('./app/routes/home.js')(home);
app.use('/api/home', home);

var posts = express.Router();
require('./app/routes/posts.js')(posts);
app.use('/api/posts', posts);

var comments = express.Router();
require('./app/routes/comments.js')(comments);
app.use('/api/comments', comments);

var category = express.Router();
require('./app/routes/category.js')(category);
app.use('/api/category', category);

var tags = express.Router();
require('./app/routes/category.js')(tags);
app.use('/api/tags', tags);


app.listen(port);
console.log("Magic happen at port " + port);
