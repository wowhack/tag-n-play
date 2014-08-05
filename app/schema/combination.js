var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
//Sub schemas
var Criteria = require('./criteria.js');

/**
 * @class CombinationSchema
 */
var CombinationSchema = new Schema( {
  criterias:                      { type: [Criteria.CriteriaSchema]},
  combinationType:                { type: String}
} );

module.exports.CombinationSchema = CombinationSchema;
//Models
var combination  = exports.Combination = mongoose.model( 'Combination', CombinationSchema );