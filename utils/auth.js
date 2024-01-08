const auth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/signup');
    } else {
      next();
    }
  };
  
  module.exports = auth;
  