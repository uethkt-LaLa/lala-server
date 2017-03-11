var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');

// Routing for posts 
module.exports = function(router){

    router.route('/')
        .get(authController.isAuthenticated, commentController.getAllComments);

    router.route('/:comment_id')
        .get(authController.isAuthenticated, commentController.getComment)
        .put(authController.isAuthenticated, commentController.putComment)
        .delete(authController.isAuthenticated, commentController.deleteComment);

    router.route('/:comment_id/like')
        .put(authController.isAuthenticated, commentController.likeComment)
        .delete(authController.isAuthenticated, commentController.unlikeComment);

    router.route('/:comment_id/dislike')
        .put(authController.isAuthenticated, commentController.dislikeComment)
        .delete(authController.isAuthenticated, commentController.undislikeComment);
}