// passport

// load up the spotify strategy
var SpotifyStrategy     = require('passport-spotify').Strategy;


//load up the user model
var User                = require('../app/schema/user.js').User;

// load the auth variables
var configAuth          = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {
    
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    
    //used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    //used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // =======================================================================
    // SPOTIFY ==============================================================
    // ======================================================================
    passport.use(new SpotifyStrategy({
        clientID: configAuth.spotifyAuth.clientID,
        clientSecret: configAuth.spotifyAuth.clientSecret,
        callbackURL: configAuth.spotifyAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        
      
            User.findOne({ spotifyID: profile.id }, function (err, user) {
                if (err)
                    return done(err);
                //if user is found, return him
                if (user) {
                    user.spotifyToken = accessToken;
                    user.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, user);
                        });
                } else {
                    //if no user is found, create one
                    
                    var newUser = new User();
                    
                    // set the credentials
                    newUser.username = profile.id;
                    newUser.spotifyID = profile.id; //use the profile id provided
                    newUser.spotifyToken = accessToken;
                    console.log(newUser);
                    newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    
                    
                }
            });

    }
    ));

};