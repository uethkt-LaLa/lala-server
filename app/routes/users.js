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
        .get(authController.isAuthenticated, userController.getUsers);

    router.route('/popular')
        .get(authController.isAuthenticated, userController.getPopularUsers);

    router.route('/:user_id')
        .get(authController.isAuthenticated, userController.getUser);

    router.route('/:user_id/followers')
        .put(authController.isAuthenticated, userController.addFollower)
        .delete(authController.isAuthenticated, userController.removeFollower);

    router.route('/:user_id/posts')
        .get(authController.isAuthenticated, postController.getPostsByUser);

}