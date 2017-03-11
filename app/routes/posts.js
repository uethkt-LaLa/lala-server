var authController = require('../controllers/auth');
var postController = require('../controllers/post');
var commentController = require('../controllers/comment');
var tagController = require('../controllers/tag');

// Routing for posts 
module.exports = function(router){

    router.route('/')
        .post(postController.postPosts)
        .get(postController.getPosts);

    router.route('/:post_id')  
        .get(postController.getPost)
        .put(postController.putPost)
        .delete(postController.deletePost);

    router.route('/:post_id/like')
        .put(postController.likePost)
        .delete(postController.unlikePost);

    router.route('/:post_id/dislike')
        .put(postController.dislikePost)
        .delete(postController.undislikePost);

    router.route('/:post_id/followers')
        .put(postController.addFollower)
        .delete(postController.removeFollower);

    router.route('/:post_id/comments')
        .post(commentController.postCommentsToPost)
        .get(commentController.getCommentsFromPost);

    router.route('/:post_id/comments/:comment_id')  
        .put(postController.addCommentToPost)
        .delete(postController.removeCommentFromPost);

    router.route('/:post_id/tags/:tag_id')  
        .put(postController.addTagToPost)
        .delete(postController.removeTagFromPost);

    router.route('/:post_id/tags')
        .get(authController.isAuthenticated, tagController.getTagsFromPost);

}