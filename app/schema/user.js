var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
//Sub schemas
var Tag = require('./tag.js');
var StoredList = require('./stored_list.js');
/**
 * @class UserSchema
 * @property {String} username
 * @property {Date} created
 */
var UserSchema = new Schema( {
  // usernames are unique.
  username:                  { type: String, unique: true, lowercase: true},
  spotifyID:                 { type: String, unique: true},
  created:                   { type: Date, default: Date.now},
  spotifyToken:              { type: String, default: ""},
  tags:                      { type: [Tag.TagSchema]},
  //friends:                   { type:[su.ref('User')]},
  playlistID:                { type:String,default:""},
  storedPlaylists:           { type:[StoredList.StoredListSchema]}
} );

// UserSchema.getUser = function (req, callback) {
//     if(typeof req.user !== null){
//       callback(null, req.user );
//     }
//     else{
//       callback(null,{message:"not logged in"});
//     }
// };

module.exports.UserSchema  = UserSchema;
//Models

var user = mongoose.model( 'User', UserSchema );
module.exports.User = user;