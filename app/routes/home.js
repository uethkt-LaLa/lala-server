var userController = require('../controllers/user');
var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');

module.exports = function(router){
    
    router.route('/')
        .get(authController.isAuthenticated, userController.getCurrentUser)
        .put(authController.isAuthenticated, userController.putUser)
        .delete(authController.isAuthenticated, userController.deleteUser);

    router.route('/posts')
        .get(authController.isAuthenticated, postController.getPostsByMe);

    router.route('/comments')
        .get(authController.isAuthenticated, commentController.getCommentsByMe);

    router.route('/:user_id/followers')
        .put(authController.isAuthenticated, userController.addFollower)
        .delete(authController.isAuthenticated, userController.removeFollower);

    router.route('/:user_id/posts')
        .get(authController.isAuthenticated, postController.getPostsByUser);



    // Routing for following stuff
    router.route('/following_people/:following_id')
        .put(authController.isAuthenticated, userController.followUser)
        .delete(authController.isAuthenticated, userController.unfollowUser);

    router.route('/following_posts/:post_id')
        .put(authController.isAuthenticated, userController.followPost)
        .delete(authController.isAuthenticated, userController.unfollowPost);

    router.route('/following_posts/')
        .get(authController.isAuthenticated, userController.getPostsUserFollow);

    router.route('/following_categories/:category_id')
        .put(authController.isAuthenticated, userController.followCategory)
        .delete(authController.isAuthenticated, userController.unfollowCategory);

    router.route('/following_tags/:tag_id')
        .put(authController.isAuthenticated, userController.followTag)
        .delete(authController.isAuthenticated, userController.unfollowTag);

    router.route('/following_tags/')
        .get(authController.isAuthenticated, userController.getTagsUserFollow);

}