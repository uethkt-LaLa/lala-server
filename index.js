var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var postController = require('./controllers/post');
var commentController = require('./controllers/comment');
var categoryController = require('./controllers/category');
var tagController = require('./controllers/tag');
var passport = require('passport');
mongoose.connect('mongodb://mocmeodx:123456@ds145389.mlab.com:45389/lala-server');
var mongodb = mongoose.connection;


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; 


// ROUTES FOR OUR API
var router = express.Router();    


// middleware to use for all requests
router.use(function (req, res, next) {
    console.log("Something is happening...");
    next(); // make sure we go to the next routes
});


// Handle get request
router.get('/', function (req, res) {
    res.json({message: "Hooray! welcome admin to our api!"});
});

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUser);

router.route('/users/:user_id/followers')
    .put(authController.isAuthenticated, userController.addFollower)
    .delete(authController.isAuthenticated, userController.removeFollower);

router.route('/users/:user_id/posts')
    .get(authController.isAuthenticated, postController.getPostsByUser);

router.route('/home')
    .get(authController.isAuthenticated, userController.getCurrentUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

router.route('/home/posts')
    .get(authController.isAuthenticated, postController.getPostsByMe)

// Routing for following stuff
router.route('/home/following_people/:following_id')
    .put(authController.isAuthenticated, userController.followUser)
    .delete(authController.isAuthenticated, userController.unfollowUser);

router.route('/home/following_posts/:post_id')
    .put(authController.isAuthenticated, userController.followPost)
    .delete(authController.isAuthenticated, userController.unfollowPost);

router.route('/home/following_categories/:category_id')
    .put(authController.isAuthenticated, userController.followCategory)
    .delete(authController.isAuthenticated, userController.unfollowCategory);

router.route('/home/following_tags/:tag_id')
    .put(authController.isAuthenticated, userController.followTag)
    .delete(authController.isAuthenticated, userController.unfollowTag);


// Routing for posts and comments
router.route('/posts')
    .post(authController.isAuthenticated, postController.postPosts)
    .get(authController.isAuthenticated, postController.getPosts);

router.route('/posts/:post_id')  
    .get(authController.isAuthenticated, postController.getPost)
    .put(authController.isAuthenticated, postController.putPost)
    .delete(authController.isAuthenticated, postController.deletePost);

router.route('/posts/:post_id/followers')
    .put(authController.isAuthenticated, postController.addFollower)
    .delete(authController.isAuthenticated, postController.removeFollower);

router.route('/posts/:post_id/comments')
    .post(authController.isAuthenticated, commentController.postCommentsToPost)
    .get(authController.isAuthenticated, commentController.getCommentsFromPost);

router.route('/posts/:post_id/comments/:comment_id')  
    .put(authController.isAuthenticated, postController.addCommentToPost)
    .delete(authController.isAuthenticated, postController.removeCommentFromPost);

router.route('/posts/:post_id/tags/:tag_id')  
    .put(authController.isAuthenticated, postController.addTagToPost)
    .delete(authController.isAuthenticated, postController.removeTagFromPost);

router.route('/comments')
    .get(authController.isAuthenticated, commentController.getAllComments);

router.route('/comments/:comment_id')
    .get(authController.isAuthenticated, commentController.getComment)
    .put(authController.isAuthenticated, commentController.putComment)
    .delete(authController.isAuthenticated, commentController.deleteComment);


// Route for categories
router.route('/category')
    .post(authController.isAuthenticated, categoryController.postCategories)
    .get(authController.isAuthenticated, categoryController.getCategories);

router.route('/category/:category_id')
    .get(authController.isAuthenticated, categoryController.getCategory)
    .put(authController.isAuthenticated, categoryController.putCategory)
    .delete(authController.isAuthenticated, categoryController.deleteCategory);

router.route('/category/:category_id/followers')
    .put(authController.isAuthenticated, categoryController.addFollower)
    .delete(authController.isAuthenticated, categoryController.removeFollower);

router.route('/category/:category_id/posts')
    .get(authController.isAuthenticated, postController.getPostsFromCategory)
    .post(authController.isAuthenticated, postController.postPostsToCategory);

router.route('/category/:category_id/posts/:post_id')  
    .put(authController.isAuthenticated, categoryController.addPostToCategory)
    .delete(authController.isAuthenticated, categoryController.removePostFromCategory);


// Route for tags
router.route('/tags')
    .post(authController.isAuthenticated, tagController.postTags)
    .get(authController.isAuthenticated, tagController.getTags);

router.route('/tags/:tag_id')
    .get(authController.isAuthenticated, tagController.getTag)
    .put(authController.isAuthenticated, tagController.putTag)
    .delete(authController.isAuthenticated, tagController.deleteTag);

router.route('/tags/:tag_id/followers')
    .put(authController.isAuthenticated, tagController.addFollower)
    .delete(authController.isAuthenticated, tagController.removeFollower);

router.route('/tags/:tag_id/posts/:post_id')  
    .put(authController.isAuthenticated, tagController.addPostToTag)
    .delete(authController.isAuthenticated, tagController.removePostFromTag);


app.use('/api', router);
app.listen(port);
console.log("Magic happen at port " + port);
