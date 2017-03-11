var userController = require('../controllers/user');
var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');

module.exports = function(router){
    
    router.route('/')
        .get(userController.getCurrentUser)
        .put(userController.putUser)
        .delete(userController.deleteUser);

    router.route('/posts')
        .get(postController.getPostsByMe);

    router.route('/comments')
        .get(commentController.getCommentsByMe);

    router.route('/:user_id/followers')
        .put(userController.addFollower)
        .delete(userController.removeFollower);

    router.route('/:user_id/posts')
        .get(postController.getPostsByUser);



    // Routing for following stuff
    router.route('/following_people/:following_id')
        .put(userController.followUser)
        .delete(userController.unfollowUser);

    router.route('/following_posts/:post_id')
        .put(userController.followPost)
        .delete(userController.unfollowPost);

    router.route('/following_categories/:category_id')
        .put(userController.followCategory)
        .delete(userController.unfollowCategory);

    router.route('/following_tags/:tag_id')
        .put(userController.followTag)
        .delete(userController.unfollowTag);

    router.route('/following_tags/')
        .get(userController.getTagsUserFollow);

}