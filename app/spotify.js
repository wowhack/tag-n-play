


    
module.exports.GetSpotifyPlaylists = function (spotifyApi, req, res) {
    
    spotifyApi.getUserPlaylists(req.user.spotifyID)
        .then(function(data) {
            res.send(data);
        },function(err) {
            console.log('Something went wrong with GetSpotifyPlaylists()!', err);
        });
};
    
 
module.exports.GetYourMusic = function(spotifyApi, req, res) {
    
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
    spotifyApi.searchTracks(name, { limit : 50, offset : 1 })
    .then(function(data) {
        return data;
    }, function(err) {
        console.log('Something went wrong GetSongsByArtist!', err);
    });
};

module.exports.GetSongsByAlbum = function(name, spotifyApi, req){
    spotifyApi.getAlbumTracks(name, { limit : 50, offset : 1 })
    .then(function(data) {
        return data;
     }, function(err) {
        console.log('Something went wrong with GetSongsByAlbum', err);
     });
};

module.exports.GetSongsFromPlaylist = function(name, spotifyApi, req){
    spotifyApi.getPlaylistTracks(req.user.spotifyID, name)
    .then(function(data){
        return data;
    }, function(err){
        console.log('Something went wrong with GetSongsFromPlaylist', err);
    });
};

module.exports.CreatePlaylist = function(songs, spotifyApi, req, res){
    console.log("This is length of songs in CreatePlaylist", songs.length);
    var user = req.user.spotifyID;
    var playlistID = req.user.playlistID;
    var playListExist = 1;
    spotifyApi.getPlaylist(user, playlistID)
    .then(function(data){
        spotifyApi.setTracksToPlaylist(user, playlistID, songs)
        .then(function(data){
            console.log("this is the data when setTracksToPlaylist is called", data);
            res.send("");
            // return data.playlisturl
        }, function(err){
            console.log("Something went wrong with CreatePlaylist().setTracksToPlaylist", err);
        });
    }, function(err){
        console.log("Something went wrong in CreatePlaylist().getPlaylist")
        playListExist = 1;
    })
    if (playListExist == 1){
        spotifyApi.createPlaylist(user, 'TagNPlayList')
        .then(function(data){
            console.log("this is the data when createPlaylist( is called)", data);
           spotifyApi.setTracksToPlaylist(user, playlistID, songs)
            .then(function(data){
                console.log("this is the data when setTracksToPlaylist is called", data);
                res.send("");
            }, function(err){
                console.log("Something went wrong with CreatePlaylist().createPlaylist().setTracksToPlaylist", err);
            });
        }, function(err){
            console.log("Something went wrong in createPLaylist");
        });
    }
};