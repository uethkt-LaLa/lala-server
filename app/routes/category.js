var authController = require('../controllers/auth');
var categoryController = require('../controllers/category');
var postController = require('../controllers/post');

// Routing for posts 
module.exports = function(router){

    // Route for categories
    router.route('/')
        .post(categoryController.postCategories)
        .get(categoryController.getCategories);

    router.route('/:category_id')
        .get(categoryController.getCategory)
        .put(categoryController.putCategory)
        .delete(categoryController.deleteCategory);

    router.route('/:category_id/followers')
        .put(categoryController.addFollower)
        .delete(categoryController.removeFollower);

    router.route('/:category_id/posts')
        .get(postController.getPostsFromCategory)
        .post(postController.postPostsToCategory);

    router.route('/:category_id/posts/:post_id')  
        .put(categoryController.addPostToCategory)
        .delete(categoryController.removePostFromCategory);
}