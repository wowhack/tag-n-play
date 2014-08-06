var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
//Sub schemas
var Criteria = require('./criteria.js');
var Spotify = require('../spotify.js');

/**
 * @class CombinationSchema
 */
var CombinationSchema = new Schema( {
  criterias:                      { type: [Criteria.CriteriaSchema]},
  combinationType:                { type: String}
} );

var combine = function (combination,spotifyApi, req){
  var songs = [];
  var critsongs = [];
  //console.log("number of criterias: "+combination.criterias.length);
  for(var i=0; i<combination.criterias.length;i++){
    var criteria = combination.criterias[i];
    //console.log("type: "+criteria.type);
    if(criteria.type=='combination'){
      critsongs[i] = combine(criteria.combinations[0]);
    }
    else{
      if(criteria.type=='tag'){
        console.log("number of tags"+req.user.tags.length);
        for(var j = 0;j<req.user.tags.length;j++){
          if(req.user.tags[j].name == criteria.name){
            critsongs[i] = req.user.tags[j].songs;
            //console.log("härdå? : "+critsongs[i].length);
            console.log("hittade en tag på index: ",i);
          }
        }
      }
      else if(criteria.type == 'artist'){
        critsongs[i] = Spotify.GetSongsByArtist(criteria.name,spotifyApi,req);
        console.log(critsongs[i]);
      }
      else if(criteria.type == 'album'){
        critsongs[i] = Spotify.GetSongsByAlbum(criteria.name,spotifyApi,req);
        //console.log("HÄÄÄR: ",critsongs[i]);
      }
      else if(criteria.type == 'playlist'){
        critsongs[i] = Spotify.GetSongsFromPlaylist(criteria.name,spotifyApi,req);
        console.log(critsongs[i]);
      }
    }
  }
  console.log("combType: " + combination.combinationType);
  if(combination.combinationType == 'and'){
    for(var i=0;i<critsongs[0].length;i++){
      if(critsongs[1].indexOf(critsongs[0][i])!=-1 && songs.indexOf(critsongs[0][i])==-1){
        songs.push(critsongs[0][i]);
      }
    }
    for(var i=0;i<critsongs[1].length;i++){
      if(critsongs[0].indexOf(critsongs[1][i])!=-1 && songs.indexOf(critsongs[1][i])==-1){
        songs.push(critsongs[1][i]);
      }
    }
  }
  else if(combination.combinationType == 'single'){
    console.log("Här är den 0 :",critsongs[0]);
    console.log("Här är den 1:",critsongs[1]);
    songs = critsongs[0];
  }
  else if(combination.combinationType == 'or'){
    for(var s = 0;s<critsongs[0].length;s++){
      songs.push(critsongs[0][s]);
    }
    for(var r = 0;r<critsongs[1].length;r++){
      var found = -1;
      for(var t = 0; t<songs.length;t++){
        if(songs[t]==critsongs[1][r]){
          console.log("fanns redan");
          found = 1;
        }
      }
      if(found ==-1){
        console.log("fanns inte");
        songs.push(critsongs[1][r]);
      }
    }
    //console.log("tog sig in");
    // for(var i = 0;i<critsongs.length;i++){
    //   //console.log("critsongs index: "+i);
    //   //console.log("critsongs ",critsongs);
    //   var found = -1;
    //   for(var k = 0; k<critsongs[i].length;k++){
    //     if(songs.indexOf(critsongs[i][k]==-1)){
    //       console.log(songs);
    //       console.log(critsongs[i][k]);
    //       songs.push(critsongs[i][k]);
    //     }
    //   }
    // }
  }
  return songs;
}

module.exports.Combine = combine;

module.exports.CombinationSchema = CombinationSchema;
//Models
var combination  = exports.Combination = mongoose.model( 'Combination', CombinationSchema );