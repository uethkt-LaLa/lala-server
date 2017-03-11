var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');

// Routing for posts 
module.exports = function(router){

    router.route('/')
        .get(commentController.getAllComments);

    router.route('/:comment_id')
        .get(commentController.getComment)
        .put(commentController.putComment)
        .delete(commentController.deleteComment);

    router.route('/:comment_id/like')
        .put(commentController.likeComment)
        .delete(commentController.unlikeComment);

    router.route('/:comment_id/dislike')
        .put(commentController.dislikeComment)
        .delete(commentController.undislikeComment);
}