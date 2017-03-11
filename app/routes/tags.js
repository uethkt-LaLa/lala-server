var authController = require('../controllers/auth');
var tagController = require('../controllers/tag');

// Routing for posts 
module.exports = function(router){

    // Route for tags
    router.route('/')
        .post(tagController.postTags)
        .get(tagController.getTags);

    router.route('/:tag_id')
        .get(tagController.getTag)
        .put(tagController.putTag)
        .delete(tagController.deleteTag);

    router.route('/:tag_id/followers')
        .put(tagController.addFollower)
        .delete(tagController.removeFollower);

    router.route('/:tag_id/posts/:post_id')  
        .put(tagController.addPostToTag)
        .delete(tagController.removePostFromTag);

    router.route('/:tag_id/posts') 
        .get(tagController.getAllPosts); 
}