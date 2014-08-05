var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
/**
 * @class TagSchema
 */
var TagSchema = new Schema( {
  name:                      { type: String, unique: true, lowercase: true},
  created:                   { type: Date, default: Date.now},
  songs:                     { type: [String]}
} );

module.exports.TagSchema                  = TagSchema;
//Models
exports.Tag = mongoose.model( 'Tag', TagSchema );
var tag = exports.Tag;