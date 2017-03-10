var authController = require('../controllers/auth');
var tagController = require('../controllers/tag');

// Routing for posts 
module.exports = function(router){

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
}