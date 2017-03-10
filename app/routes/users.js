var userController = require('../controllers/user');
var authController = require('../controllers/auth');
var postController = require('../controllers/post');

module.exports = function(router){

    // router.use(function(req, res, next){
    //     if(req.isAuthenticated()){
    //         return next();
    //     }
    //     res.redirect('/auth');
    // });

    router.route('/')
        .post(userController.postUsers)
        .get(userController.getUsers);

    router.route('/popular')
        .get(userController.getPopularUsers);

    router.route('/:user_id')
        .get(userController.getUser);

    router.route('/:user_id/followers')
        .put(userController.addFollower)
        .delete(userController.removeFollower);

    router.route('/:user_id/posts')
        .get(postController.getPostsByUser);

}