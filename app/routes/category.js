var authController = require('../controllers/auth');
var categoryController = require('../controllers/category');
var postController = require('../controllers/post');

// Routing for posts 
module.exports = function(router){

    // Route for categories
    router.route('/')
        .post(authController.isAuthenticated, categoryController.postCategories)
        .get(authController.isAuthenticated, categoryController.getCategories);

    router.route('/:category_id')
        .get(authController.isAuthenticated, categoryController.getCategory)
        .put(authController.isAuthenticated, categoryController.putCategory)
        .delete(authController.isAuthenticated, categoryController.deleteCategory);

    router.route('/:category_id/followers')
        .put(authController.isAuthenticated, categoryController.addFollower)
        .delete(authController.isAuthenticated, categoryController.removeFollower);

    router.route('/:category_id/posts')
        .get(authController.isAuthenticated, postController.getPostsFromCategory)
        .post(authController.isAuthenticated, postController.postPostsToCategory);

    router.route('/:category_id/posts/:post_id')  
        .put(authController.isAuthenticated, categoryController.addPostToCategory)
        .delete(authController.isAuthenticated, categoryController.removePostFromCategory);
}