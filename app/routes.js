// routes.js


module.exports = function(app, passport){
    
    app.get('/', function(req, res){
        res.render('index'); // load the index.html file
    }); 
    
    app.get('/auth/spotify',
        passport.authenticate('spotify'),
        function(req, res){
            // The request will be redirected to spotify for authentication, so this
            // function will not be called.
        });

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
      });
    
    
}