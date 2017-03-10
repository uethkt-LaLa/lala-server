var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');

// Routing for posts 
module.exports = function(router){

    router.route('/')
        .post(authController.isAuthenticated, postController.postPosts)
        .get(authController.isAuthenticated, postController.getPosts);

    router.route('/:post_id')  
        .get(authController.isAuthenticated, postController.getPost)
        .put(authController.isAuthenticated, postController.putPost)
        .delete(authController.isAuthenticated, postController.deletePost);

    router.route('/:post_id/like')
        .put(authController.isAuthenticated, postController.likePost)
        .delete(authController.isAuthenticated, postController.unlikePost);

    router.route('/:post_id/dislike')
        .put(authController.isAuthenticated, postController.dislikePost)
        .delete(authController.isAuthenticated, postController.undislikePost);

    router.route('/:post_id/followers')
        .put(authController.isAuthenticated, postController.addFollower)
        .delete(authController.isAuthenticated, postController.removeFollower);

    router.route('/:post_id/comments')
        .post(authController.isAuthenticated, commentController.postCommentsToPost)
        .get(authController.isAuthenticated, commentController.getCommentsFromPost);

    router.route('/:post_id/comments/:comment_id')  
        .put(authController.isAuthenticated, postController.addCommentToPost)
        .delete(authController.isAuthenticated, postController.removeCommentFromPost);

    router.route('/:post_id/tags/:tag_id')  
        .put(authController.isAuthenticated, postController.addTagToPost)
        .delete(authController.isAuthenticated, postController.removeTagFromPost);

}