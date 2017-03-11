var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        passReqToCallback: true,
        profileFields: ["id","emails","name","photos"]
      },
      function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                //user is not logged in yet
                if(!req.user){
                    User.findOne({'fb_id': profile.id}, function(err, user){
                        if(err)
                            return done(err);
                        if(user){
                            if(!user.token){
                                user.token = accessToken;
                                user.username = profile.name.givenName + ' ' + profile.name.familyName;
                                user.email = profile.emails[0].value;
                                user.image_url = profile.photos[0].value;
                                user.save(function(err){
                                    if(err)
                                        throw err;
                                });

                            }
                            return done(null, user);
                        }
                        else {
                            var newUser = new User();
                            newUser.fb_id = profile.id;
                            newUser.token = accessToken;
                            newUser.username = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.email = profile.emails[0].value;
                            newUser.image_url = profile.photos[0].value;

                            newUser.save(function(err){
                                if(err)
                                    throw err;
                                return done(null, newUser);
                            })
                        }
                    });
                }

                //user is logged in already, and needs to be merged
                else {
                    var user = req.user;
                    user.fb_id = profile.id;
                    user.token = accessToken;
                    user.username = profile.name.givenName + ' ' + profile.name.familyName;
                    user.email = profile.emails[0].value;
                    user.image_url = profile.photos[0].value;

                    user.save(function(err){
                        if(err)
                            throw err
                        return done(null, user);
                    })
                }
                
            });
        }

    ));
}
