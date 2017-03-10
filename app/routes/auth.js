module.exports = function(router, passport){
    router.get('/', function(req, res){
        res.render('index.ejs');
    });
    
    router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

    router.get('/facebook/callback', 
      passport.authenticate('facebook', { successRedirect: '/profile',
                                          failureRedirect: '/' }));

    router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }), function(req, res){
        console.log("account" + req.account);
    });

    router.get('/unlink/facebook', function(req, res){
        var user = req.user;

        user.facebook.token = null;

        user.save(function(err){
            if(err)
                throw err;
            res.redirect('/profile');
        })
    });

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })
};