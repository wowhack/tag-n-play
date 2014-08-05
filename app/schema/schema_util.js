var mongoose = require( 'mongoose' );
var util     = require( 'util' );
var Schema   = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

// /**
// * Creates reference to another schema.
// */
// module.exports.ref = function( reference ) {
//   return { type: ObjectId, ref: reference };
// };
/**
 * Creates a base schema.
 * @exports schema_util/baseSchema
 * @param baseFields fields to add to all base schemas.
 */
module.exports.baseSchema = function( baseFields ) {
  var bs = function() {
    Schema.apply( this, arguments );
    this.add( baseFields );

    this.Base = this.constructor;
  };

  util.inherits( bs, Schema );

  return new bs();
};