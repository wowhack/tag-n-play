var yarm            = require("yarm"),
    user            = require("./schema/user.js"),
    combination     = require("./schema/combination.js"),
    criteria        = require("./schema/criteria.js"),
    storedList      = require("./schema/stored_list.js"),
    tag             = require("./schema/tag.js"),
    utils           = require("./api-utils.js");
    
// yarm.resource("user")
//     //.hook(utils.isAuthenticated())
//     .get("Hej");

yarm.resource("user")
  .get(function(req, cb) {
    if(typeof req.user !== null){
      cb(null, req.user );
    }
    else{
      cb(null,{message:"not logged in"});
    }
  });