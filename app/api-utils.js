module.exports.isAuthenticated = function(req, next) {
  if( req.isAuthenticated() )
  {
    next();
  } else {
    next.methodNotAllowed();
  }
};