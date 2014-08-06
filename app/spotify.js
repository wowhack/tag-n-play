



    
module.exports.GetSpotifyPlaylists = function (spotifyApi, req, res) {
    spotifyApi.setAccessToken(req.user.spotifyToken);
    spotifyApi.getUserPlaylists(req.user.spotifyID)
        .then(function(data) {
            res.send(data);
        },function(err) {
            console.log('Something went wrong with GetSpotifyPlaylists()!', err);
        });
};
    
 
module.exports.GetYourMusic = function(spotifyApi, req, res) {
    spotifyApi.setAccessToken(req.user.spotifyToken);
    spotifyApi.getMySavedTracks({
        limit : 50,
        offset: 1 
    })
    .then(function(data) {
       res.send(data);
    }, function(err) {
        console.log('Something went wrong with GetYourMusic()!', err);
    });
};


module.exports.GetSongsByArtist = function(name, spotifyApi, req){
    spotifyApi.setAccessToken(req.user.spotifyToken);
    spotifyApi.searchTracks(name, { limit : 50, offset : 1 })
    .then(function(data) {
        return data;
    }, function(err) {
        console.log('Something went wrong GetSongsByArtist!', err);
    });
};

module.exports.GetSongsByAlbum = function(name, spotifyApi, req){
    spotifyApi.setAccessToken(req.user.spotifyToken);
    spotifyApi.getAlbumTracks(name, { limit : 50, offset : 1 })
    .then(function(data) {
        return data;
     }, function(err) {
        console.log('Something went wrong with GetSongsByAlbum', err);
     });
};

module.exports.GetSongsFromPlaylist = function(name, spotifyApi, req){
    spotifyApi.setAccessToken(req.user.spotifyToken);
    spotifyApi.getPlaylistTracks(req.user.spotifyID, name)
    .then(function(data){
        return data;
    }, function(err){
        console.log('Something went wrong with GetSongsFromPlaylist', err);
    });
};

module.exports.CreatePlaylist = function(songs, spotifyApi, req, res){
    spotifyApi.setAccessToken(req.user.spotifyToken);
    // console.log("This is length of songs in CreatePlaylist", songs.length);
    // console.log("this is songs: ", songs);
    var User = req.user;
    // console.log("This is user spotifyID" + User);
    var playlistID = req.user.playlistID;
    //console.log("outside: " + req.user.playlistID);
    var playListExist = -1;
    // spotifyApi.getPlaylist(req.user.spotifyID, playlistID)
    // .then(function(data){
    //     console.log("inside getPlaylist: " + playlistID, songs);
    //     spotifyApi.setTracksToPlaylist(req.user.spotifyID, playlistID, {uris:songs})
    //     .then(function(data){
    //         console.log("this is the data when setTracksToPlaylist is called", data);
    //         playListExist = -1;
    //         res.send("");
    //         // return data.playlisturl
    //     }, function(err){
    //         console.log("Something went wrong with CreatePlaylist().setTracksToPlaylist", err);
    //     });
    // }, function(err){
    //     console.log("Something went wrong in CreatePlaylist().getPlaylist")
    //     playListExist = 1;
    // })
    //if (playListExist == 1){
    if(req.user.playlistID!=""){
        spotifyApi.getPlaylist(req.user.spotifyID, req.user.playlistID).then(function(data){
             if(!data.public){
                spotifyApi.createPlaylist(User.spotifyID, 'TagNPlayList')
                .then(function(data){
                    // console.log("this is the data when createPlaylist( is called)", data);
                   var newPlaylistID = data.id;
                   
                   var UserModel  = require('./schema/user').User;
                   UserModel.findOne({ spotifyID: req.user.spotifyID }, function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                user.playlistID = newPlaylistID;
                                user.save(function(err) {
                                        if (err)
                                            throw err;
                                        //console.log("successfully save playlistID");
                                    });
                                    //res.send("success");
                            } else {
                                // console.log(newUser);
                                // newUser.save(function(err) {
                                //         if (err)
                                //             throw err;
                                //         return done(null, newUser);
                                //     });
                                //console.log("user not found in addTag");
                                
                            }
                        });
                   
                   
                   console.log(User.spotifyID+ ' : '+data.id + ' : '+[]);
                   spotifyApi.setTracksToPlaylist(User.spotifyID, data.id, {uris:songs})
                    .then(function(data){
                        res.send("success");
                    }, function(err){
                        //console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
                    });
                }, function(err){
                    //console.log("Something went wrong in createPLaylist", err);
                });
             }
             else{
                 //console.log("hä är de: ",songs);
                spotifyApi.setTracksToPlaylist(User.spotifyID, req.user.playlistID, {uris:songs})
                .then(function(data){
                     spotifyApi.getPlaylist(req.user.spotifyID, req.user.playlistID).then(function(data){
                         if(!data.public){
                             
                         }
                         //res.send("success");
                     });
                    //return playlistID;
                }, function(err){
                    //console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
                });
                 }
        });
    }
    else{
        spotifyApi.createPlaylist(User.spotifyID, 'TagNPlayList')
        .then(function(data){
            // console.log("this is the data when createPlaylist( is called)", data);
           var newPlaylistID = data.id;
           
           var UserModel  = require('./schema/user').User;
           UserModel.findOne({ spotifyID: req.user.spotifyID }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        user.playlistID = newPlaylistID;
                        user.save(function(err) {
                                if (err)
                                    throw err;
                                console.log("successfully save playlistID");
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
           
           
           //console.log(User.spotifyID+ ' : '+data.id + ' : '+[]);
           spotifyApi.setTracksToPlaylist(User.spotifyID, data.id, {uris:songs})
            .then(function(data){
                // console.log("this is the data when setTracksToPlaylist is called", data);
                //return playlistID;
            }, function(err){
                console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
            });
        }, function(err){
            console.log("Something went wrong in createPLaylist", err);
        });
    }
    
    // console.log("HÄÄÄÄÄÄÄÄR: " + req.user.playlistID);
    // if(req.user.playlistID==""){
    //     spotifyApi.createPlaylist(User.spotifyID, 'TagNPlayList')
    //     .then(function(data){
    //         // console.log("this is the data when createPlaylist( is called)", data);
    //       var newPlaylistID = data.id;
           
    //       var UserModel  = require('./schema/user').User;
    //       UserModel.findOne({ spotifyID: req.user.spotifyID }, function (err, user) {
    //                 if (err)
    //                     return done(err);
    //                 if (user) {
    //                     user.playlistID = newPlaylistID;
    //                     user.save(function(err) {
    //                             if (err)
    //                                 throw err;
    //                             console.log("successfully save playlistID");
    //                         });
    //                         res.json(user);
    //                 } else {
    //                     // console.log(newUser);
    //                     // newUser.save(function(err) {
    //                     //         if (err)
    //                     //             throw err;
    //                     //         return done(null, newUser);
    //                     //     });
    //                     console.log("user not found in addTag");
                        
    //                 }
    //             });
           
           
    //       console.log(User.spotifyID+ ' : '+data.id + ' : '+[]);
    //       spotifyApi.setTracksToPlaylist(User.spotifyID, data.id, {uris:songs})
    //         .then(function(data){
    //             // console.log("this is the data when setTracksToPlaylist is called", data);
    //             //return playlistID;
    //         }, function(err){
    //             console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
    //         });
    //     }, function(err){
    //         console.log("Something went wrong in createPLaylist", err);
    //     });
    // }
    // else{
    //     spotifyApi.setTracksToPlaylist(User.spotifyID, req.user.playlistID, {uris:songs})
    //         .then(function(data){
    //              spotifyApi.getPlaylist(req.user.spotifyID, req.user.playlistID).then(function(data){
    //                  if(!data.public){
                         
    //                  }
    //              });
    //             //return playlistID;
    //         }, function(err){
    //             console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
    //         });
    // }
};