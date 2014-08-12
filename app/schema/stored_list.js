var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
//Sub schemas
var Combination = require('./combination.js');

/**
 * @class StoredListSchema
 */
var StoredListSchema = new Schema( {
  name:                      { type: String, lowercase: true},
  created:                   { type: Date, default: Date.now},
  combinations:              { type: [Combination.CombinationSchema]}
} );

module.exports.StoredListSchema = StoredListSchema;
//Models
exports.StoredList = mongoose.model( 'StoredList', StoredListSchema );
var StoredList = mongoose.model( 'StoredList', StoredListSchema );