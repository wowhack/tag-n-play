var mongoose  = require( 'mongoose' );
var Schema    = mongoose.Schema;
var su        = require( './schema_util.js' );
//Sub schemas
var Combination= require('./combination.js');

/**
 * @class CriteriaSchema
 */
var CriteriaSchema = new Schema( {
  name:                           { type: String},
  criteriaType:                   { type: String}
} );
CriteriaSchema.add({combinations: [Combination.CombinationSchema]});

module.exports.CriteriaSchema = CriteriaSchema;
//Models
var criteria = exports.Criteria = mongoose.model( 'Criteria', CriteriaSchema );