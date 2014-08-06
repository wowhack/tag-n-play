// routes.js
var User = require('./schema/user.js').User;
var Tag = require('./schema/tag.js').Tag;
var SpotifyWebApi = require('spotify-web-api-node');
var ConfigAuth = require('../config/auth');
var Combination = require("./schema/combination.js");

var spotifyApi = new SpotifyWebApi({
  clientId : ConfigAuth.spotifyAuth.clientId,
  clientSecret : ConfigAuth.spotifyAuth.clientSecret,
  redirectUri : ConfigAuth.spotifyAuth.callbackURL
});
var Spotify = require("./spotify.js");

module.exports = function(app, passport){
    
    app.get('/', function(req, res){
        res.render('login'); // load the login.html file
    });
    app.get('/home',isLoggedIn, function(req, res){
        res.render('index'); // load the index.html file
    }); 
    
    app.get('/auth/spotify',
        passport.authenticate('spotify', {scope: ['playlist-read-private','playlist-modify-private', 'playlist-modify-public', 'user-library-read', ] }),
        function(req, res){
            // The request will be redirected to spotify for authentication, so this
            // function will not be called.
        });

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function(req, res) {
            //set access token on the 
            spotifyApi.setAccessToken(req.user.spotifyToken);
            // Successful authentication, redirect home.
            res.redirect('home');
            //console.log("HERE: "+req.user);
      });
      
      
    function getUser(req, res, next) {
      // Resitify currently has a bug which doesn't allow you to set default headers
      // This headers comply with CORS and allow us to server our response to any origin
      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // .find() without any arguments, will return all results
      // the `-1` in .sort() means descending order
      //console.log(req.user);
      res.send(req.user);
    }
    
    function addTag(req, res, next) {
      var user = req.user;
      var tagName = req.param('name');
      var type = req.param('type');
      var newSongs = req.param('songs');
      
      if(tagName !== undefined && newSongs !== undefined && user!==undefined && user.spotifyID!==undefined){
          User.findOne({ spotifyID: user.spotifyID }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    var found = -1;
                    for(var i = 0; i<user.tags.length;i++){
                        if(user.tags[i].name==tagName){
                            console.log(user.tags[i].name + " : " + tagName);
                            found = 1;
                            for(var j = 0;j<newSongs.length;j++){
                                if(user.tags[i].songs.indexOf(newSongs[j])==-1){
                                    user.tags[i].songs.push(newSongs[j]);
                                }
                            }
                        }
                    }
                    if(found==-1){
                        user.tags.push(new Tag({name:tagName,songs:newSongs}));
                    }
                    user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("successfully added song to a tag");
                        });
                        res.json(user);
                } else {
                    // console.log(newUser);
                    // newUser.save(function(err) {
                    //         if (err)
                    //             throw err;
                    //         return done(null, newUser);
                    //     });
                    console.log("user not found in addTag");
                    
                }
            });
      }
      else res.send("");
      
    }
    function removeSongFromTag(req, res, next) {
      var user = req.user;
      var tagName = req.param('name');
      //var type = req.param('type');
      var newSongs = req.param('songs');
      
      if(tagName !== undefined && newSongs !== undefined && user!==undefined && user.spotifyID!==undefined){
          console.log("börjar ta bort");
          User.findOne({ spotifyID: user.spotifyID }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    var found = -1;
                    for(var i = 0; i<user.tags.length;i++){
                        if(user.tags[i].name==tagName){
                            //console.log(user.tags[i].name + " : " + tagName);
                            found = 1;
                            for(var j = 0;j<newSongs.length;j++){
                                //var index = user.tags[i].songs.indexOf(newSongs[j])!=-1;
                                for(var k = 0;k<user.tags[i].songs.length;k++){
                                    if(user.tags[i].songs[k]==newSongs[j]){
                                        //console.log("tar bort på index: "+ k);
                                        //console.log("före:",user.tags[i].songs);
                                        user.tags[i].songs.splice(k,1);
                                        //console.log("efter:",user.tags[i].songs);
                                    }
                                }
                                // console.log("tar bort på index: "+ index);
                                // if(index>-1){
                                //     user.tags[i].songs = user.tags[i].songs.splice(index,1);
                                // }
                            }
                        }
                    }
                    if(found==-1){
                        user.tags.push(new Tag({name:tagName,songs:newSongs}));
                    }
                    user.save(function(err) {
                            if (err)
                                throw err;
                            console.log("successfully removed song from a tag");
                        });
                        res.json(user);
                } else {
                    // console.log(newUser);
                    // newUser.save(function(err) {
                    //         if (err)
                    //             throw err;
                    //         return done(null, newUser);
                    //     });
                    console.log("user not found in addTag");
                    
                }
            });
      }
      else res.send("");
      
    }

    function createPlaylist(req, res, next) {
      //res.header("Access-Control-Allow-Origin", "*"); 
      //res.header("Access-Control-Allow-Headers", "X-Requested-With");
      var songs = [];
      var combinations = req.param('combinations');
      //console.log("combinations and crits: ",combinations[0].criterias[1]);
      if(combinations !== undefined && combinations.length>0){
        for(var i = 0; i<1;i++){
          var combSongs = Combination.Combine(combinations[i],spotifyApi,req);
          //console.log("number of combSongs: "+combSongs.length);
          for(var j = 0; j<combSongs.length;j++){
            songs.push(combSongs[j]);
          }
        }
        console.log("after for: "+songs.length);
        User.findOne({ spotifyID: req.user.spotifyID }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                var playlistID = Spotify.CreatePlaylist(songs,spotifyApi,req,res);
                //console.log("playlistID : " + playlistID)
                // user.playlistID = playlistID;
                // user.save(function(err) {
                //         if (err)
                //             throw err;
                //         res.send(req.user.playlistID);
                //         console.log("successfully created a playlist with id: "+playlistID);
                //     });
                //     res.send("");
            } else {

                console.log("user not found in createPlaylist()");
                
            }
        });
      }
      res.send("");
    }
    function getYourMusic(req, res, next) {
      var yourMusic = Spotify.GetYourMusic(spotifyApi,req,res);
    }
    function getSpotifyPlaylists(req, res, next) {
      var playlists = Spotify.GetSpotifyPlaylists(spotifyApi,req,res);
      //var data = {items : ["1","2","3"]};
      //res.send(data);
      //console.log("NbrOfPlaylists : " + playlists.total);
      //res.send(playlists);
    }
    // function populate (req,res,next){
    //     addTag();
    // }
    
    
    app.post('/rest/tags/add',addTag);
    app.post('/rest/tags/remove',removeSongFromTag);
    app.get('/rest/user',getUser);
    app.get('/rest/spotify/playlists',isLoggedIn, getSpotifyPlaylists);
    app.get('/rest/spotify/your-music',isLoggedIn, getYourMusic);
    app.post('/rest/user/create-playlist',isLoggedIn,createPlaylist);
    //app.get('/rest/test/populate',isLoggedIn,populate);
    
    
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
        
    // if the aren't redirect them to the home page
    res.redirect('/');
}