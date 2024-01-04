const withAuth = (req, res, next) => {
    //if user is not logged in, redirect if not ends middlewere and goes nex
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
      //^this next method: ends the middleware and moves to the next middleware
    }
  };
  
  module.exports = withAuth;
  