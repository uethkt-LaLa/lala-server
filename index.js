var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');


// --------------CONFIGURATION--------------
var port = process.env.PORT || 5000; 

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
var mongodb = mongoose.connection;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Handle get request
app.get('/api', function (req, res) {
    res.json({message: "Hooray! welcome admin to our api!"});
});


// routes for users: /api/users
var users = express.Router();
require('./app/routes/users.js')(users);
app.use('/api/users', users);


// routes for home: /api/home
var home = express.Router();
require('./app/routes/home.js')(home);
app.use('/api/home', home);


// routes for posts: /api/posts
var posts = express.Router();
require('./app/routes/posts.js')(posts);
app.use('/api/posts', posts);


// routes for comments: /api/comments
var comments = express.Router();
require('./app/routes/comments.js')(comments);
app.use('/api/comments', comments);


// routes for category: /api/category
var category = express.Router();
require('./app/routes/category.js')(category);
app.use('/api/category', category);


// routes for tags: /api/tags
var tags = express.Router();
require('./app/routes/tags.js')(tags);
app.use('/api/tags', tags);


app.listen(port);
console.log("Magic happen at port " + port);
