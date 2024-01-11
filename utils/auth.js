const auth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/');
      return
    } else {
      next();
    }
  };
  
  module.exports = auth;
  